import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Tweet } from './entity/tweet.entity';
import { SignUp } from './entity/user.entity';

@Injectable()
export class AppService {
  private usersDatabase: SignUp[] = [];
  private tweetsDatabase: Tweet[] = [];

  constructor() {
    this.usersDatabase = [];
    this.tweetsDatabase = [];
  }

  getHealth(): string {
    return "I'm okay!";
  }

  registerUser(newUser: SignUp): string {
    this.usersDatabase.push(newUser);
    return 'Success';
  }

  createTweet(author: string, content: string): string {
    const authorRecord = this.usersDatabase.find(user => user.username === author);

    if (!authorRecord) {
      throw new UnauthorizedException('You must be logged!');
    }

    const newTweet: Tweet = {
      username: author,
      tweet: content,
      avatar: authorRecord.avatar,
    };

    this.tweetsDatabase.push(newTweet);

    return 'Success';
  }

  getLatestTweets(page: number | null): Tweet[] {
    if (page !== null && (page < 1 || isNaN(page))) {
      throw new BadRequestException();
    }
  
    const tweetsPerPage = 15; // Number of tweets per page
    const startIndex = page === null ? 0 : (page - 1) * tweetsPerPage;
    const endIndex = startIndex + tweetsPerPage;
  
    const reversedTweets = [...this.tweetsDatabase].reverse();
    const latestTweets = reversedTweets.slice(startIndex, endIndex);
  
    return latestTweets; // No need to reverse the order here
  }

  getUserTweets(username: string): Tweet[] {
    const userTweets = this.tweetsDatabase.filter(tweet => tweet.username === username);
    return userTweets.reverse();
  }
}
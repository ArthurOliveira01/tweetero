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
    if (page !== undefined && (page < 1 || isNaN(page))) {
      throw new BadRequestException();
    }
    const tweetsPerPage = 15;
    const startIndex = page === undefined ? Math.max(0, this.tweetsDatabase.length - tweetsPerPage) : (page - 1) * tweetsPerPage;
    const reversedTweets = [...this.tweetsDatabase].reverse();
    const latestTweets = reversedTweets.slice(startIndex, startIndex + tweetsPerPage);
    return latestTweets.reverse();
  }

  getUserTweets(username: string): Tweet[] {
    const userTweets = this.tweetsDatabase.filter(tweet => tweet.username === username);
    return userTweets.reverse();
  }
}
import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SignUpDto } from './dtos/signup.dto';
import { TweetDto } from './dtos/tweet.dto';
import { Tweet } from './entity/tweet.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('sign-up')
  @HttpCode(200)
  signUp(@Body() signUpDto: SignUpDto): string {
    return this.appService.registerUser(signUpDto);
  }

  @Post('tweets')
  postTweet(@Body() publishTweetDto: TweetDto): string {
    const { username, tweet } = publishTweetDto;
    return this.appService.createTweet(username, tweet);
  }

  @Get('tweets')
  getTweets(@Query('page') page: number): Tweet[] {
    return this.appService.getLatestTweets(page);
  }

  @Get('tweets/:username')
  getUserTweets(@Param('username') username: string): Tweet[] {
    return this.appService.getUserTweets(username);
  }
}
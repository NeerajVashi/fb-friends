import { expect } from 'chai';
import pool from '../config/query';
import createTestData from '../migrationScript/testMigration';

describe('Query Test', () => {
  beforeEach(async () => {
    //  await exec('npm run mig');
    await createTestData();
  });
  it('suggested friends', async () => {
    const users = await pool.suggestedFriends(5);
    console.log('users', users);
    expect(users).deep.equals(true);
  });
  
  it('when you  click on ADD Friend sugested friend save with status 0', async () => {
    const newFriendsRequest = {
        senderId:'1',
        receiverId:'3',
        senderFirstName:'neeraj',
        senderSurname:'vashi',
        senderProfile_pic:'neerajPic',
        receiverFirstName:'rajjo',
        receiverSurname:'sharm', 
        receiverProfile_pic:'rajjopic'
    }
    const users = await pool.addFriend(newFriendsRequest);
    console.log('users', users);
    expect(users).deep.equals(true);
  });
   it('when you click on delete user segested friend add to friend table with status =  2--->means decline friends', async () => {
    const newFriendsRequest = {
        senderId:'1',
        receiverId:'3',
        senderFirstName:'neeraj',
        senderSurname:'vashi',
        senderProfile_pic:'neerajPic',
        receiverFirstName:'rajjo',
        receiverSurname:'sharm', 
        receiverProfile_pic:'rajjopic'
    }
    const users = await pool.discard(newFriendsRequest);
    console.log('users', users);
    expect(users).deep.equals(true);
   });

   it('show incomming friend request', async () => {
    const id = 2; 
   const users = await pool.friendRequest(id);
    console.log('users', users);
    expect(users).deep.equals(true);
   });

   it('confirm friend request', async () => {
    const userId = {
        senderId :1,
        receiverId:2,
    }; 
   const users = await pool.confirmFriendRequest(userId);
    console.log('users', users);
    expect(users).deep.equals(true);
   });

   it('delete friend request', async () => {
    const userId = {
        senderId :1,
        receiverId:2,
    }; 
   const users = await pool.decline(userId);
    console.log('users', users);
    expect(users).deep.equals(true);
   });

   it('display all friends', async () => {

   const friends = await pool.friends(2);
    expect(friends).deep.equals(true);
   });

   it('remove friends', async () => {
    const userId = {
        senderId:1,
        receiverId:2,
    }
    const friends = await pool.removeFriends(userId);
     expect(friends).deep.equals(true);
    });

});
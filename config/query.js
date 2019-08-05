import pool from './sqlPool';

async function suggestedFriends(id) {
  try {
    const [users] = await pool.execute(`(select * from userDetails where not exists (select * from friendsTable where userDetails.id = friendsTable.senderId or  userDetails.id = friendsTable.receiverId ) and userDetails.id != ${id})`);
    return users;
  } catch(err) {
     console.log('err', err);
  }
}

async function addFriend(friend) {
    try {
        console.log('addfriend', friend);
        await pool.query(`insert into friendsTable values (? , ?, ?, ?, ?, ?, ?, ?, ?)`, [friend.receiverId, friend.senderId, friend.senderFirstName, friend.senderSurname, friend.senderProfile_pic, friend.receiverFirstName, friend.receiverSurname, friend.receiverProfile_pic, 0]);
        const [users] = await pool.execute(`(select * from userDetails where not exists (select * from friendsTable where userDetails.id = friendsTable.senderId or  userDetails.id = friendsTable.receiverId ) and userDetails.id != ${friend.senderId})`);
        return users;
    } catch(err) {
        console.log('err', err);
    }

}

async function discard(friend) {
    try {
        console.log('discard friends', friend);
        await pool.query(`insert into friendsTable values (? , ?, ?, ?, ?, ?, ?, ?,?)`, [friend.senderId, friend.receiverId, friend.senderFirstName, friend.senderSurname, friend.senderProfile_pic, friend.receiverFirstName, friend.receiverSurname, friend.receiverProfile_pic, 2]);
        const [users] = await pool.execute(`(select * from userDetails where not exists (select * from friendsTable where userDetails.id = friendsTable.senderId or  userDetails.id = friendsTable.receiverId or userDetails.id = ${friend.receiverId}))`);
        console.log('friends', users);
        return users
    } catch (err) {
        console.log('err', err);
    }

}

async function friendRequest(id) {
    try {
        console.log('friendRequest', id);
        const [friends] = await pool.execute('select * from friendsTable where receiverId = ? and status = ?', [id, 0]);
        console.log('friends', friends);
        return friends
    } catch(err) {
        console.log('err', err);
    }

}

async function confirmFriendRequest(userId) {
    try {
        console.log('confirm friendRequests', userId);
        await pool.execute('update friendsTable set status = ? where senderId = ? and receiverId = ?', [1, userId.senderId, userId.receiverId]);
        const [friends] = await pool.execute('select * from friendsTable where receiverId = ? and status = ?', [userId.receiverId, 0]);
        console.log('friends', friends);
        return friends
    } catch(err) {
        console.log('err', err);
    }

}


async function decline(userId) {
    try {
        console.log('discard friends', userId);
        await pool.execute(`delete from friendsTable where senderId = ? and receiverId = ? `, [userId.senderId, userId.receiverId]);
        const [friends] = await pool.execute('select * from friendsTable where receiverId = ? and status = ?', [userId.receiverId, 0]);
        return friends
    } catch (err) {
        console.log('err', err);
    }

}

// (select senderId, receiverId from friendsTable where receiverId = 1 and status = 1) union  (select senderId, receiverId from friendsTable where senderId = 1 and status = 1);
async function friends(receiverId) {
    try {
        console.log('friends',receiverId);
        const [friends] = await pool.execute(` (select * from friendsTable where receiverId = ${receiverId} and status = 1) union  (select * from friendsTable where senderId = ${receiverId} and status = 1)`);
        return friends
    } catch(err) {
        console.log('err', err);
    }

}

async function removeFriends(userId) {
    try {
        console.log('friends', userId);
        await pool.execute('delete from friendsTable where senderId = ? receiverId = ?', [userId.senderId, userId.receiverId]);
        return friends
    } catch(err) {
        console.log('err', err);
    }

}

module.exports = {
    suggestedFriends:suggestedFriends,
    addFriend:addFriend,
    discard:discard,
    friendRequest:friendRequest,
    confirmFriendRequest:confirmFriendRequest,
    friends:friends,
    removeFriends:removeFriends,
    decline:decline
}

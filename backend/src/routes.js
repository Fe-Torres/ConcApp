const express = require('express');
const UserController = require('./controllers/UserController');
const MessageController = require('./controllers/MessageController');
const PostsController = require('./controllers/PostsController');
const FollowController = require('./controllers/FollowController');
const SessionController = require('./controllers/SessionController');
const ComentPostController = require('./controllers/ComentPostController');
const NotificationController = require('./controllers/NotificationController');

const routes = express.Router();

//Coment
routes.post('/coment',ComentPostController.create);
routes.put('/coment',ComentPostController.update_coment);
routes.delete('/coment',ComentPostController.delete_coment);
routes.get('/singlecoment',ComentPostController.single_coment);

//Follow
routes.post('/follow',FollowController.create);
routes.delete('/follow',FollowController.delete);
routes.get('/usersfollowing',FollowController.following_users);
routes.get('/usersfolloweres',FollowController.followeres_users);

//Posts
routes.post('/post',PostsController.create);
routes.get('/post',PostsController.index_posts);
routes.post('/like',PostsController.like_post);
routes.delete('/post',PostsController.delete_post);
routes.put('/post',PostsController.update_post);
routes.get('/singlepost',PostsController.single_post);

//Session
routes.post('/login',SessionController.login);

//Message
routes.post('/message',MessageController.create_message);
routes.get('/singlemessage',MessageController.single_message);

//Notificaiton
routes.get('/allnotification',NotificationController.index);
routes.get('/singlenotification',NotificationController.index_single);
routes.put('/allnotification',NotificationController.viewall_notification);
routes.put('/singlenotification',NotificationController.viewsingle_notification);
routes.delete('/allnotification',NotificationController.deleteall_notification);
routes.delete('/singlenotification',NotificationController.deletesingle_notification);

//User
routes.post('/user',UserController.create);
routes.get('/allusers', UserController.allusers);
routes.get('/profile', UserController.index);

module.exports = routes;
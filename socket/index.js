import { Server } from "socket.io";

const io = new Server({
	cors: {
		origin: "http://localhost:3000",
	},
});

let onlineUsers = [];

const addNewUser = (name, socketId) => {
	!onlineUsers.some((user) => user.name === name) &&
		onlineUsers.push({ name, socketId });
};

const removeUser = (socketId) => {
	onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (name) => {
	return onlineUsers.find((user) => user.name === name);
};

io.on("connection", (socket) => {
	socket.on("newUser", (name) => {
		addNewUser(name, socket.id);
	});

	socket.on("sendNotification", ({ senderName, receiverName }) => {
		const receiver = getUser(receiverName);

		io.to(receiver.socketId).emit("getNotification", {
			senderName,
		});
	});

	socket.on("disconnect", () => {
		removeUser(socket.id);
	});
});

io.listen(8800);

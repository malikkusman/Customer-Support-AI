import axios from "axios";

export const userLogin = async (email, password) => {
	try {
		const response = await axios.post("/user/login", { email, password });
		if (response.status !== 200) {
			throw new Error();
		}
		const data = response.data;
		return data;
	} catch (err) {
		throw new Error(`Error! Cannot Login. ${err.message}`);
	}
};

export const userSignup = async (name, email, password) => {
	try {
		const response = await axios.post("/user/signup", {
			name,
			email,
			password,
		});
		const data = response.data;
		return data;
	} catch (err) {
		console.log(err);
		throw new Error(`Error! Cannot Signup. ${err.message}`);
	}
};

export const getAuthStatus = async () => {
	try {
		const response = await axios.get("/user/auth-status");
		if (response.status !== 200) {
			throw new Error("Could not verify authentication status");
		}
		const data = response.data;
		return data;
	} catch (err) {
		throw new Error(err.message);
	}
};

export const postChatRequest = async (message) => {
	console.log("hello", message);
	try {
		const response = await axios.post("/chat/new", { message });
		console.log(response);
		if (response.status !== 200) {
			throw new Error();
		}
		const data = response.data;
		return data;
	} catch (err) {
		console.log(err);
		throw new Error(err.message);
	}
};

export const getAllChats = async () => {
	try {
		const response = await axios.get("/chat/all-chats");
		if (response.status !== 200) {
			throw new Error();
		}
		const data = response.data;
		return data;
	} catch (err) {
		console.log(err);
		throw new Error(err.message);
	}
};

export const deleteAllChats = async () => {
	try {
		const response = await axios.delete("/chat/delete-all-chats");
		if (response.status !== 200) {
			throw new Error();
		}
		const data = response.data;
		return data;
	} catch (err) {
		console.log(err);
		throw new Error(err.message);
	}
};

export const logoutUser = async () => {
	try {
		const response = await axios.get("/user/logout");
		if (response.status !== 200) {
			throw new Error();
		}
		const data = response.data;
		return data;
	} catch (err) {
		console.log(err);
		throw new Error(err.message);
	}
};

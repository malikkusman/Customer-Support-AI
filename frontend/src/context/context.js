
import {
	userLogin,
	getAuthStatus,
	logoutUser,
	userSignup,
} from "../helpers/api";
import {
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

const AuthContext = createContext(null);

// React component
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setisLoggedIn] = useState(false);

	// Check if user cookies are valid and then skip login
	useEffect(() => {
		const checkAuthStatus = async () => {
			const data = await getAuthStatus();
			if (data) {
				setUser({ email: data.email, name: data.name });
				setisLoggedIn(true);
			}
		};
		checkAuthStatus();
	}, []);

	const login = async (email, password) => {
		const data = await userLogin(email, password);
		if (data) {
			setUser({ email: data.email, name: data.name });
			setisLoggedIn(true);
		}
	};

	const signup = async (name, email, password) => {
		await userSignup(name, email, password);
	};

	const logout = async () => {
		await logoutUser();
		setisLoggedIn(false);
		setUser(null);
		window.location.reload(); // Reload webpage
	};

	const value = {
		user,
		isLoggedIn,
		login,
		logout,
		signup,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create variable context that should be used by the children
export const useAuth = () => useContext(AuthContext);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/context";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<Toaster position="bottom-right" />
				<App />
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>
);
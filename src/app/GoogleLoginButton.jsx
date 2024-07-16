"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuthContext } from "@/context/AuthProvider";

const GoogleLoginButton = ({ language, idTrivia }) => {
	const router = useRouter();

	const { token, userId, setToken, setUserId } = useAuthContext();

	const handleGoogleLoginSuccess = useCallback(
		async (credentialResponse) => {
			try {
				const response = await axios.post(
					"https://backend.emmagini.com/api2/google_login",
					{
						host: "demo5.emmagini.com",
						client_id: credentialResponse.clientId,
						credential: credentialResponse.credential,
						fcm_token: "",
						es_app: "0",
						id_plataforma: "3",
						lang: "es",
						timezone: "-3",
					},
					{
						headers: {
							"Content-Type":
								"application/x-www-form-urlencoded; charset=UTF-8",
						},
					}
				);

				localStorage.setItem("token", response.data.token);
				localStorage.setItem("userId", response.data.userid);

				setToken(response.data.token);
				setUserId(response.data.userid);
			} catch (error) {
				console.error("Error al hacer la solicitud:", error);
				throw error;
			}
		},
		[router, language, idTrivia]
	);

	useEffect(() => {
		console.log("token:", token);
		console.log("userId:", userId);
	}, [token, userId]);

	function handleClick() {
		return router.push(`/${language}/trivia/${idTrivia}`);
	}

	return (
		<button
			className="w-full rounded-full shadow-md border border-gray-200 cursor-pointer"
			onClick={handleClick}
		>
			<GoogleLogin
				onSuccess={handleGoogleLoginSuccess}
				onError={() => {
					console.log("Login failed");
				}}
				className="rounded-full w-full"
			/>
		</button>
	);
};

export default GoogleLoginButton;

/*const handleGoogleLoginSuccess = async (credentialResponse) => {
		const data = {
			host: "demo5.emmagini.com",
			client_id: credentialResponse.clientId,
			credential: credentialResponse.credential,
			fcm_token: "",
			es_app: "0",
			id_plataforma: "3",
			lang: "es",
			timezone: "-3",
		};

		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/google_login",
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log("Login successful:", response.data);
		} catch (error) {
			console.error("Error logging in:", error);
		}
	}; */

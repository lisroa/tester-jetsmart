"use client";

import { useDataContext } from "@/context/DataProvider";
import withAuth from "../withAuth";
import NavBar from "@/components/home/NavBar";
import ImageBanner from "../../components/home/ImageBanner";
import Table from "@/components/home/Table";
import ButtonNav from "@/components/home/ButtonNav";
import "@/styles/styles.css";

function Home() {
	const { data, empresa, language } = useDataContext();

	if (!empresa && !data) {
		return (
			<div className="mt-96">
				<section className="dots-container">
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
				</section>
				<h1 className="text-blueEmmagini text-center mt-4 font-semibold">
					CARGANDO
				</h1>
			</div>
		);
	}

	return (
		<main>
			<NavBar logo={empresa.logo} />
			{empresa.header_activo_landing === 1 && (
				<ImageBanner
					image={empresa.header_imagen}
					welcomeText={empresa.header_1}
					title={empresa.header_2}
					subtitle={empresa.header_contenido}
					button={true}
					buttonText={data.keytext.btn_header_mas}
				/>
			)}

			<Table />
			<ButtonNav />
		</main>
	);
}

export default withAuth(Home);

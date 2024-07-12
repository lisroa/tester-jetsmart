import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import tester from "../../../public/assets/tester.jpeg";

interface ModalProps {
	text: string;
	onClick?: () => void;
	isOpen: boolean;
	textButton: string;
	image: string;
}

const Modal = ({ text, onClick, isOpen, textButton, image }: ModalProps) => {
	if (!isOpen) {
		return null;
	}
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-lg bg-opacity-50 bg-gray-300">
			<div className="bg-gray-100 p-6 w-[563px] h-[461px] relative rounded-lg flex flex-col items-center justify-center">
				<h1 className="text-center text-xl font-bold mb-4">{text}</h1>
				<div className="w-full h-[300px] flex items-center justify-center">
					<Image
						src={image}
						alt="Modal Image"
						className="object-cover"
						width={300}
						height={500}
					/>
				</div>
				<button
					onClick={onClick}
					className="w-full h-[48px] bg-blueEmmagini rounded-[50px] border-2 border-gray-300 mt-4"
				>
					<span className="text-white">{textButton}</span>
				</button>
			</div>
		</div>
	);
};

export default Modal;

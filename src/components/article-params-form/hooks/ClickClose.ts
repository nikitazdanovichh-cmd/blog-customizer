import { useEffect } from 'react';

type ClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const ClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: ClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		if (!isOpen) {
			return;
		}

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isOpen, rootRef]);
};
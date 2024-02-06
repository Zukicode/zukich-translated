import { RiArrowDropDownLine } from 'react-icons/ri';

import { setLanguage } from 'features/translate/translate.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { FC } from 'react';
import { translatorArray } from 'utils/translatorArray';
import styles from './SelectLanguage.module.scss';

interface SelectLanguageProps {
	current: string;
	isOutput?: boolean;
	isVisible: boolean;
	handleClick: () => void;
}

export const SelectLanguage: FC<SelectLanguageProps> = ({
	current,
	isOutput = false,
	isVisible,
	handleClick,
}) => {
	const dispatch = useAppDispatch();
	const { currentLang } = useAppSelector(state => state.translate);

	const changeLanguage = (lang: { name: string; short: string }) => {
		if (isOutput) {
			dispatch(
				setLanguage({
					...currentLang,
					to: {
						...lang,
					},
				})
			);
		} else {
			dispatch(
				setLanguage({
					...currentLang,
					from: {
						...lang,
					},
				})
			);
		}

		handleClick();
	};

	return (
		<div className={styles.select}>
			<button onClick={handleClick} className={styles.current}>
				{current} <RiArrowDropDownLine />
			</button>

			{isVisible && (
				<div
					style={
						isOutput ? { background: '#121826' } : { background: '#212936' }
					}
					className={styles.dropdown}
				>
					{translatorArray
						.filter(lang => lang.name !== current)
						.map(lang => (
							<span
								key={lang.short}
								className={styles.itemDropdown}
								onClick={() => changeLanguage(lang)}
							>
								{lang.name}
							</span>
						))}
				</div>
			)}
		</div>
	);
};

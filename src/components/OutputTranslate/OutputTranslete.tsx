import { useState } from 'react';
import styles from './OutputTranslete.module.scss';

//Components
import { SelectLanguage } from 'components/SelectLanguage/SelectLanguage';

//Redux
import { doSwitch, setValues } from 'features/translate/translate.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';

//Icons
import switchIcon from 'images/switch.svg';
import { FaVolumeUp } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';

//Other
import { Loader } from 'components/Loader/Loader';
import { copyToClipboard } from 'utils/copytoclipboard';
import { speakText } from 'utils/speakText';

export const OutputTranslete = () => {
	const dispatch = useAppDispatch();
	const { values, currentLang, status } = useAppSelector(
		state => state.translate
	);

	const [isVisibleLang, setVisibleLang] = useState<boolean>(false);

	const onChangeValue = (value: string) =>
		dispatch(setValues({ ...values, valueOutput: value }));

	const toggleDropdown = () => setVisibleLang(!isVisibleLang);

	const clickToSwitch = () => dispatch(doSwitch());

	return (
		<div className={styles.block}>
			<div className={styles.header}>
				<div className={styles.chooseLanguage}>
					<SelectLanguage
						current={currentLang.to.name}
						isOutput={true}
						isVisible={isVisibleLang}
						handleClick={toggleDropdown}
					/>
				</div>

				<button onClick={clickToSwitch} className={styles.switch}>
					<img src={switchIcon} alt='switch' />
				</button>
			</div>

			{status === 'loading' ? (
				<Loader />
			) : (
				<textarea
					value={values.valueOutput}
					onChange={e => onChangeValue(e.target.value)}
				/>
			)}

			<div className={styles.footer}>
				<button onClick={() => speakText(values.valueOutput)}>
					<FaVolumeUp />
				</button>
				<button onClick={() => copyToClipboard(values.valueOutput)}>
					<FiCopy strokeWidth={3} />
				</button>
			</div>
		</div>
	);
};

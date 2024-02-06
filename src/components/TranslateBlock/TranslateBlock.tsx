import { useEffect, useState } from 'react';
import styles from './TranslateBlock.module.scss';

//Components
import { SelectLanguage } from 'components/SelectLanguage/SelectLanguage';

//Redux
import { setValues } from 'features/translate/translate.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';

//Icons
import { FaVolumeUp } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';
import { PiTranslate } from 'react-icons/pi';

//Other
import { fetchTranslate } from 'features/translate/translate.action';
import { copyToClipboard } from 'utils/copytoclipboard';

import { debounce } from 'lodash';
import { speakText } from 'utils/speakText';

export const TranslateBlock = () => {
	const dispatch = useAppDispatch();
	const { values, currentLang } = useAppSelector(state => state.translate);

	const [isVisibleLang, setVisibleLang] = useState<boolean>(false);

	const onChangeValue = (value: string) => {
		dispatch(setValues({ ...values, valueTranslate: value }));
	};

	useEffect(() => {
		const localDebounce = debounce(() => {
			translate();
		}, 1000);

		if (values.valueTranslate.trim() !== '') {
			localDebounce();
		}

		return () => {
			localDebounce.cancel(); // Отменяем ожидающие вызовы при размонтировании компонента
		};
	}, [values.valueTranslate]);

	const toggleDropdown = () => setVisibleLang(!isVisibleLang);

	const translate = () =>
		dispatch(
			fetchTranslate({ from: currentLang.from.short, to: currentLang.to.short })
		);

	return (
		<div className={styles.block}>
			<div className={styles.header}>
				<SelectLanguage
					current={currentLang.from.name}
					isOutput={false}
					isVisible={isVisibleLang}
					handleClick={toggleDropdown}
				/>
			</div>

			<div className={styles.entry}>
				<textarea
					value={values.valueTranslate}
					onChange={e => onChangeValue(e.target.value)}
				/>
				<p>{values.valueTranslate.length}/500</p>
			</div>

			<div className={styles.footer}>
				<div className={styles.fastUse}>
					<button onClick={() => speakText(values.valueTranslate)}>
						<FaVolumeUp />
					</button>
					<button onClick={() => copyToClipboard(values.valueTranslate)}>
						<FiCopy strokeWidth={3} />
					</button>
				</div>

				<button onClick={translate} className={styles.translateButton}>
					<PiTranslate strokeWidth={5} />
					<p>Translate</p>
				</button>
			</div>
		</div>
	);
};

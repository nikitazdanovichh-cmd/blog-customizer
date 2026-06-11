import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import { ClickClose } from './hooks/ClickClose';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	currentAppState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentAppState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState(currentAppState);
	const formRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	ClickClose({
		isOpen: isMenuOpen,
		rootRef: formRef,
		onChange: setIsMenuOpen,
	});

	const handleChange =
		(field: keyof ArticleStateType) => (value: OptionType) => {
			setFormState((prev) => ({ ...prev, [field]: value }));
		};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = (event: React.FormEvent) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
			<aside
				ref={formRef}
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text weight={800} size={31} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleChange('fontColor')}
					/>

					<div className={styles.separatorWrapper}>
						<Separator />
					</div>

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleChange('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
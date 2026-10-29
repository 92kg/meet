import { useTranslation } from 'react-i18next'
import { cn } from '~/utils/style'
import { Button } from './Button'
import DropdownMenu from './DropdownMenu'
import { Icon } from './Icon/Icon'

export const LanguageSelector = () => {
	const { i18n } = useTranslation()

	const languages = [
		{ code: 'en', label: 'English', flag: '🇺🇸' },
		{ code: 'zh', label: '中文', flag: '🇨🇳' },
	]

	const currentLang =
		languages.find((l) => i18n.language.startsWith(l.code)) || languages[0]

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<Button className="text-sm" displayType="secondary">
					<span className="mr-1">{currentLang.flag}</span>
					{currentLang.label}
					<Icon type="ChevronDownIcon" className="ml-1 w-4 h-4 inline" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content align="end">
					{languages.map((lang) => (
						<DropdownMenu.Item
							key={lang.code}
							onClick={() => i18n.changeLanguage(lang.code)}
							className={cn(
								i18n.language.startsWith(lang.code) &&
									'bg-orange-500 text-white'
							)}
						>
							<span className="mr-2">{lang.flag}</span>
							{lang.label}
						</DropdownMenu.Item>
					))}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	)
}
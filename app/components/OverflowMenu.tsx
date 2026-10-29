import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRoomContext } from '~/hooks/useRoomContext'
import { useRoomUrl } from '~/hooks/useRoomUrl'
import { Button } from './Button'
import DropdownMenu from './DropdownMenu'
import { Icon } from './Icon/Icon'
import { participantCount, ParticipantsDialog } from './ParticipantsMenu'
import { ReportBugDialog } from './ReportBugDialog'
import { SettingsDialog } from './SettingsDialog'

interface OverflowMenuProps {
	bugReportsEnabled: boolean
}

export const OverflowMenu: FC<OverflowMenuProps> = ({ bugReportsEnabled }) => {
	const { t } = useTranslation()
	const {
		room: { otherUsers, identity },
		dataSaverMode,
		setDataSaverMode,
		audioOnlyMode,
		setAudioOnlyMode,
		simulcastEnabled,
		userMedia: { turnCameraOff },
	} = useRoomContext()
	const [settingsMenuOpen, setSettingMenuOpen] = useState(false)
	const [bugReportMenuOpen, setBugReportMenuOpen] = useState(false)
	const [participantsMenuOpen, setParticipantsMenuOpen] = useState(false)
	const roomUrl = useRoomUrl()
	return (
		<>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild>
					<Button displayType="secondary">
						<VisuallyHidden>{t('common.moreOptions')}</VisuallyHidden>
						<Icon type="EllipsisVerticalIcon" />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Portal>
					<DropdownMenu.Content sideOffset={5}>
						{simulcastEnabled && (
							<DropdownMenu.Item
								onSelect={() => setDataSaverMode(!dataSaverMode)}
							>
								<Icon type="WifiIcon" className="mr-2" />
								{dataSaverMode
									? t('room.disableDataSaver')
									: t('room.enableDataSaver')}
							</DropdownMenu.Item>
						)}
						<DropdownMenu.Item
							onSelect={() => {
								setAudioOnlyMode(!audioOnlyMode)
								turnCameraOff()
							}}
						>
							<Icon type="PhoneIcon" className="mr-2" />
							{audioOnlyMode
								? t('room.disableAudioOnly')
								: t('room.enableAudioOnly')}
						</DropdownMenu.Item>
						<DropdownMenu.Item
							onSelect={() => navigator.clipboard.writeText(roomUrl)}
						>
							<Icon type="ClipboardDocumentIcon" className="mr-2" />
							{t('room.copyUrl')}
						</DropdownMenu.Item>
						<DropdownMenu.Item
							onSelect={() => {
								setSettingMenuOpen(true)
							}}
						>
							<Icon type="cog" className="mr-2" />
							{t('settings.title')}
						</DropdownMenu.Item>
						{bugReportsEnabled && (
							<DropdownMenu.Item
								onSelect={() => {
									setBugReportMenuOpen(true)
								}}
							>
								<Icon type="bug" className="mr-2" />
								{t('common.reportBug')}
							</DropdownMenu.Item>
						)}
						<DropdownMenu.Item
							className="md:hidden"
							onSelect={() => {
								setParticipantsMenuOpen(true)
							}}
						>
							<Icon type="userGroup" className="mr-2" />
							{participantCount(otherUsers.length + 1)}
						</DropdownMenu.Item>
						<DropdownMenu.Arrow />
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
			{settingsMenuOpen && (
				<SettingsDialog open onOpenChange={setSettingMenuOpen} />
			)}
			{bugReportsEnabled && bugReportMenuOpen && (
				<ReportBugDialog onOpenChange={setBugReportMenuOpen} />
			)}
			{participantsMenuOpen && (
				<ParticipantsDialog
					otherUsers={otherUsers}
					identity={identity}
					open
					onOpenChange={setParticipantsMenuOpen}
				/>
			)}
		</>
	)
}
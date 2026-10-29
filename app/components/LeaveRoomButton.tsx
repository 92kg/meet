import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useNavigate } from '@remix-run/react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from './Button'
import { Icon } from './Icon/Icon'
import { Tooltip } from './Tooltip'

interface LeaveRoomButtonProps {
	navigateToFeedbackPage: boolean
	meetingId?: string
}

export const LeaveRoomButton: FC<LeaveRoomButtonProps> = ({
	navigateToFeedbackPage,
	meetingId,
}) => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	return (
		<Tooltip content={t('room.leave')}>
			<Button
				displayType="danger"
				onClick={() => {
					const params = new URLSearchParams()
					if (meetingId) params.set('meetingId', meetingId)
					navigate(
						navigateToFeedbackPage ? `/call-quality-feedback?${params}` : '/'
					)
				}}
			>
				<VisuallyHidden>{t('room.leave')}</VisuallyHidden>
				<Icon type="phoneXMark" />
			</Button>
		</Tooltip>
	)
}
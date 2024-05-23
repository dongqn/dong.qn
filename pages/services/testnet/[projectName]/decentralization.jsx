import { getLayout } from '@layouts/dashboard'
import { authPocketbase, pb } from '@utils/pocketbase/pb'
import { Alert } from 'antd'
import dynamic from 'next/dynamic'

const LeafletNoSSR = dynamic(() => import('@components/Map'), {
	ssr: false
})

const DecentralizationPage = ({ data }) => {
	return (
		<div>
			<Alert
				className='!w-fit mb-2'
				message='The data and analysis displayed on this page may not be 100% accurate. Please treat it only as approximate'
				type='info'
				showIcon
			/>
			<LeafletNoSSR data={data} />
		</div>
	)
}

DecentralizationPage.getLayout = getLayout

export async function getServerSideProps(context) {
	const { projectName } = context.params

	try {
		await authPocketbase()
		const data = await pb.collection('decentralization_map_testnet').getFirstListItem(`name="${projectName}"`)

		return { props: { data } }
	} catch (error) {
		console.error('Failed to fetch project data:', error)
		return { props: { data: {} } }
	}
}

export default DecentralizationPage

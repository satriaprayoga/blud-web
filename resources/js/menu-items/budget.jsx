import { IconCalendarTime } from '@tabler/icons';
import SourceOutlined from '@mui/icons-material/SourceOutlined';

const icons = { IconCalendarTime, SourceOutlined };

const budget = {
    id: 'budget',
    title: 'Anggaran',
    type: 'group',
    children: [
        {
            id: 'apbd',
            title: 'APBD',
            type: 'collapse',
            icon: icons.IconCalendarTime,
            children:[
                {
                    id:'apbd',
                    title:'Pengaturan',
                    type:'item',
                    url:'/apbd'
                },
                {
                    id:'dpa',
                    title:'DPA',
                    type:'item',
                    url:'/dpa'
                }
            ]
        },
        {
            id: 'rab',
            title: 'RAB',
            type: 'collapse',
            icon: icons.SourceOutlined,
            children: [
                {
                    id: 'rab_pendapatan',
                    title: 'Pendapatan',
                    type:'item',
                    url: '/'
                },
                {
                    id: 'rab_belanja',
                    title: 'Belanja',
                    type:'item',
                    url: '/'
                },

                {
                    id: 'rab_pembiayaan',
                    title: 'Pembiayaan',
                    type:'item',
                    url: '/'
                },
                {
                    id: 'rab_pengesahan',
                    title: 'Pengesahan',
                    type:'item',
                    url: '/'
                }
            ]

        }
    ]

}

export default budget;
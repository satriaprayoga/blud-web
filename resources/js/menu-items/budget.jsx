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
            id: 'rba',
            title: 'RBA',
            type: 'collapse',
            icon: icons.SourceOutlined,
            children: [
                {
                    id: 'rba_pendapatan',
                    title: 'Pendapatan',
                    type:'item',
                    url: '/rba'
                },
                {
                    id: 'rba_belanja',
                    title: 'Belanja',
                    type:'item',
                    url: '/rba'
                },

                {
                    id: 'rba_pembiayaan',
                    title: 'Pembiayaan',
                    type:'item',
                    url: '/rba'
                },
                {
                    id: 'rba_pengesahan',
                    title: 'Pengesahan',
                    type:'item',
                    url: '/rba'
                }
            ]

        }
    ]

}

export default budget;
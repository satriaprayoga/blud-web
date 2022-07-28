
import {IconBuildingCommunity, IconBuilding} from '@tabler/icons'
import { AccountTreeOutlined } from '@mui/icons-material';

const icon={IconBuildingCommunity, IconBuilding,AccountTreeOutlined};

const settings={
    id:'settings',
    title:'Pengaturan',
    type:'group',
    children:[
        {
            id:'units',
            title:'Unit Kerja',
            type:'item',
            url:'/units',
            icon:icon.IconBuildingCommunity,
            breadcrumbs:false
        },
        {
            id:'accounts',
            title:'Rekening',
            type:'collapse',
            icon:icon.AccountTreeOutlined,
            children: [
                {
                    id: 'lra',
                    title: 'LRA',
                    type: 'item',
                    url: '/accounts/lra',
                    target: false
                },
                {
                    id: 'lpe',
                    title: 'LPE',
                    type: 'item',
                    url: '/accounts/lpe',
                    target: false
                },
                {
                    id: 'lo',
                    title: 'LO',
                    type: 'item',
                    url: '/accounts/lo',
                    target: false
                },
                {
                    id: 'neraca',
                    title: 'Neraca',
                    type: 'item',
                    url: '/accounts/neraca',
                    target: false
                },
            ]
        }
    ]
}

export default settings;
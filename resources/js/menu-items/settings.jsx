
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
                    url: '/',
                    target: true
                },
                {
                    id: 'lpe',
                    title: 'LPE',
                    type: 'item',
                    url: '/',
                    target: true
                },
                {
                    id: 'lo',
                    title: 'LO',
                    type: 'item',
                    url: '/',
                    target: true
                },
                {
                    id: 'neraca',
                    title: 'Neraca',
                    type: 'item',
                    url: '/',
                    target: true
                },
            ]
        }
    ]
}

export default settings;
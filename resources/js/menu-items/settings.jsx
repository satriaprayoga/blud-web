
import {IconBuildingCommunity, IconBuilding} from '@tabler/icons'

const icon={IconBuildingCommunity, IconBuilding};

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
        }
    ]
}

export default settings;
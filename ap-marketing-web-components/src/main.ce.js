
import { defineCustomElement } from 'vue'
import MarketingTable from './MainTable.ce.vue'
import 'flowbite'
const MarketingTableWC = defineCustomElement(MarketingTable)

customElements.define('ap-marketing-table', MarketingTableWC)
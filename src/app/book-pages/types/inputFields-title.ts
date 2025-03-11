import { bibliographic, cataloging, acquisition, inventory } from './book-input-data'
import { General_info, Subscription_details, Volume, Publication, Library_info } from './journal-input-data'


export const inputFields = [
    { title: "Bibliographic Information", fields: bibliographic },
    { title: "Cataloging and Classification", fields: cataloging },
    { title: "Acquisition Details", fields: acquisition },
    { title: "Inventory and Identification", fields: inventory },
  ]

  export const inputJournalFields = [
    { title: "General Information", fields: General_info },
    { title: "Subscription Details", fields: Subscription_details },
    { title: "Volume", fields: Volume },
    { title: "Publication", fields: Publication },
    { title: "Library Information", fields: Library_info },

  ]
// index signatures 

// sometimes we need to present a type of dictionaries , where values of a consistent type are retrievable by keys


const phones = {
    home: { country: "+1", area: "211", number: "652-4515" },
    work: { country: "+1", area: "670", number: "752-5856" },
    fax: { country: "+1", area: "322", number: "525-4357" },
}


// clearly  it seems that we can store phone number under a key - in this case home, office, fax and possibly other words of our choosing - and each phone number is compared of three strings.  we could describe this value using what is called an index signature: 

var phone: {
    [k: string]: {
        country: string
        area: string    
        number: string
        code?: number
    } | undefined
} = {}

phone.fax
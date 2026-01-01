import * as cheerio from 'cheerio';


export async function AdmitCard(): Promise<void> {
    const response = await fetch("https://sarkariresult.com.cm/admit-card/", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,hi;q=0.7",
            "cache-control": "max-age=0",
            "priority": "u=0, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": "_ga=GA1.1.648583618.1767111010; izootoWpConfig=%7B%22b_type%22:1,%22d_type%22:1,%22evt_trk%22:1,%22izooto_uid%22:%22b7bee072-1293-45b8-8893-9dc98a8e1b72%22%7D; _lscache_vary=d8d3e33f0ee20c1db48a1d2b6d343d25; __gsas=ID=367a4fdfb6247174:T=1767118191:RT=1767118191:S=ALNI_MavxcUj_BkTFltqWcLGeLaK1VJZ7g; FCOEC=%5B%5B%5B28%2C%22%5Bnull%2C%5Bnull%2C1%2C%5B1767118191%2C834931000%5D%2C0%5D%5D%22%5D%5D%5D; FCNEC=%5B%5B%22AKsRol8Xfv5n1wJAi4CAH6zdy9Takk9OMUfAsXAo-4tFfF7t414mU9GBVZPs4cKWYbJ6CLTjERav74-zGR8Pd6gSwh9mQavCbJpPJF7jccjNs90ETAREPiT5jXM19rY48HTlz8gacOTWXed1qQE4yGSYwHfKnNNIpw%3D%3D%22%5D%5D; FCCDCF=%5Bnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B%5B32%2C%22%5B%5C%2277d4b8a2-a477-4097-94af-9b4af45fa1d3%5C%22%2C%5B1767111010%2C918000000%5D%5D%22%5D%5D%5D; __gads=ID=1662b99f7a63c013:T=1767111009:RT=1767120322:S=ALNI_MZd4HdLvC1YruuTEj8wODxp4ap8Mg; __gpi=UID=000011d7ec161d6c:T=1767111009:RT=1767120322:S=ALNI_MaRYIMAOMbSSz55-chcB507TQQHig; __eoi=ID=bec1a4e09c6f98e3:T=1767111009:RT=1767120322:S=AA-AfjZjlcxWQr2iFZOL-KaD8niS; _ga_LZ32T0N2XE=GS2.1.s1767122072$o4$g1$t1767122921$j60$l0$h0"
        },
        "body": null,
        "method": "GET"
    });
    
    const res = await response.text();

    const $ = cheerio.load(res);

    $('ul.wp-block-latest-posts li').each(
        (index: number, element) => {
            const text = $(element).text().trim();
            const link = $(element).find('a').attr('href');

            console.log({
                index,
                text,
                link
            });
        }
    );
}






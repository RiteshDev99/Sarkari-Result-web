import * as cheerio from 'cheerio';

export async function latestJob(): Promise<void> {
    const response = await fetch("https://sarkariresult.com.cm/latest-jobs/");
    const res = await response.text();

    const $ = cheerio.load(res);

    $('ul.latest-posts-last-date li').each(
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

latestJob();

import * as cheerio from "cheerio";

interface LatestJob {
    title: string;
    link: string | null;
}

export async function latestJob(): Promise<LatestJob[]> {
    const response = await fetch("https://sarkariresult.com.cm/latest-jobs/");
    const html = await response.text();
    const $ = cheerio.load(html);

    const jobs: LatestJob[] = [];

    $("ul.latest-posts-last-date li").each((_, element) => {
        const title = $(element).text().trim();
        const link = $(element).find("a").attr("href") ?? null;

        jobs.push({
            title,
            link,
        });
    });
    // console.log(jobs);
    return jobs;
}



// latestJob()


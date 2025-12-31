import * as cheerio from "cheerio";
import {latestJob} from "./latest-job";

async function latestJobDetails(link: string): Promise<void> {
    const response = await fetch(
        `${link}`
    );

    const html = await response.text();
    const $ = cheerio.load(html);
    
    const title = $("h1.gb-headline").first().text().trim();

    const postDate = $("time.entry-date").attr("datetime");

    const organization = $("a[href*='ssc.gov.in']")
        .first()
        .text()
        .trim();

    const totalPosts = $("h5:contains('Total Post')")
        .next()
        .text()
        .trim();
    
    const importantDates: string[] = [];
    $("h4:contains('Important Dates')")
        .next()
        .find("li")
        .each((_, el) => {
            importantDates.push($(el).text().trim());
        });
    
    const applicationFee: string[] = [];
    $("h4:contains('Application Fee')")
        .next()
        .find("li")
        .each((_, el) => {
            applicationFee.push($(el).text().trim());
        });
    
    const ageLimit: string[] = [];
    $("h5:contains('Age Limits')")
        .next()
        .find("li")
        .each((_, el) => {
            ageLimit.push($(el).text().trim());
        });
    
    const vacancy: any[] = [];

    $("table")
        .first()
        .find("tr")
        .slice(2)
        .each((_, row) => {
            const cols = $(row).find("td");
            vacancy.push({
                category: $(cols[1]).text().trim(),
                male: $(cols[2]).text().trim(),
                female: $(cols[3]).text().trim(),
            });
        });
    
    const eligibility: string[] = [];
    $("strong:contains('Eligibility Criteria')")
        .closest("table")
        .find("li")
        .each((_, el) => {
            eligibility.push($(el).text().trim());
        });
    
    const selectionProcess: string[] = [];
    $("span:contains('Mode Of Selection')")
        .closest("table")
        .find("li")
        .each((_, el) => {
            selectionProcess.push($(el).text().trim());
        });
    
    const importantLinks: any[] = [];
    $("table")
        .last()
        .find("tr")
        .each((_, row) => {
            const cols = $(row).find("td");
            if (cols.length === 2) {
                importantLinks.push({
                    title: $(cols[0]).text().trim(),
                    url: $(cols[1]).find("a").attr("href"),
                });
            }
        });

    const jobData = {
        title,
        postDate,
        organization,
        totalPosts,
        importantDates,
        applicationFee,
        ageLimit,
        vacancy,
        eligibility,
        selectionProcess,
        importantLinks,
    };

    console.log(JSON.stringify(jobData, null, 2));
}


//
// async function run() {
//     const jobs = await latestJob(); 
//
//     if (!jobs.length) {
//         throw new Error("No jobs found");
//     }
//
//     const firstJobLink = jobs[3].link;
//
//     if (!firstJobLink) {
//         throw new Error("Job link missing");
//     }
//
//     await latestJobDetails(firstJobLink);
// }
//
// run();
import * as cheerio from "cheerio";
import {latestJob} from "./latest-job";



interface vacancyType {
    category: string;
    male: string;
    female: string;
}

async function latestJobDetails(): Promise<void> {
    const response = await fetch(
        // `${link}`
        "https://sarkariresult.com.cm/ssc-gd-constable-recruitment-2026-apply-online-chk/"
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

    const vacancy: vacancyType[] = [];

    const vacancyTable = $("table").filter((_, table) =>
        $(table).text().includes("Category Wise Vacancy")
    );
    

    vacancyTable.find("tr").each((_, row) => {
        const cols = $(row).find("td");

        // skip empty rows
        if (cols.length === 0) return;

        // skip header row explicitly
        const categoryText = cols.eq(cols.length === 4 ? 1 : 0).text().trim();
        if (categoryText === "Category") return;

        // first data row (with rowspan)
        if (cols.length === 4) {
            vacancy.push({
                category: cols.eq(1).text().trim(),
                male: cols.eq(2).text().trim(),
                female: cols.eq(3).text().trim(),
            });
        }

        // remaining rows
        else if (cols.length === 3) {
            vacancy.push({
                category: cols.eq(0).text().trim(),
                male: cols.eq(1).text().trim(),
                female: cols.eq(2).text().trim(),
            });
        }
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

    const importantLinks: { title: string; link: string }[] = [];

// STEP 1: find the correct table by CONTENT
    const importantLinksTable = $("table").filter((_, table) =>
        $(table).find("a[href]").length > 0 &&
        $(table).text().includes("Apply Online")
    ).first();

// safety check
    if (!importantLinksTable.length) {
        console.error("❌ Important Links table not found");
    }

// STEP 2: extract rows
    importantLinksTable.find("tr").each((_, row) => {
        const cols = $(row).find("td");

        // table ALWAYS has exactly 2 columns
        if (cols.length !== 2) return;

        const title = cols.eq(0).text().replace(/\s+/g, " ").trim();
        const link = cols.eq(1).find("a").attr("href");

        if (!title || !link) return;

        importantLinks.push({
            title,
            link,
        });
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


latestJobDetails()


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
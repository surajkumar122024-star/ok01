import type { ToolContentData } from "@/components/ToolContentSection";

/**
 * Extended, tool-specific content. Entries here override (or add to) the ones
 * in toolContent.ts — see the merge at the bottom of that file.
 */
export const extraToolContent: Record<string, ToolContentData> = {
  "image-converter": {
    overview: [
      "Different apps, websites and devices accept different image formats, and the format you have is often not the one a form, a CMS or a design tool wants. This converter takes a JPG, PNG, WebP, GIF or BMP and re-saves it as JPG, PNG, WebP, GIF, BMP or ICO from a single screen, so you do not have to hunt for a separate tool for every pair of formats.",
      "Everything runs inside your browser. The image is decoded onto an HTML canvas on your own device, re-encoded in the format you pick, and handed back as a download. Nothing is uploaded, which matters when the picture is an ID scan, a product photo that is not public yet, or a client mock-up.",
      "The tool is honest about what each format can and cannot do. JPG is small but has no transparency. PNG is lossless and keeps transparency but is larger. WebP is usually the smallest for websites. GIF is limited to a small colour palette, BMP is uncompressed and therefore large, and ICO is the icon format used for favicons and Windows icons and is capped at 256 x 256 pixels.",
    ],
    steps: [
      { title: "Add your image", description: "Click the upload area or drag a JPG, PNG, WebP, GIF or BMP file onto it. A preview confirms the right file was picked." },
      { title: "Choose the output format", description: "Select JPG, PNG, WebP, GIF, BMP or ICO. The default is PNG, which is the safest choice if you are unsure." },
      { title: "Convert", description: "Press Convert. Processing happens on your device and normally takes a moment, even for large photos." },
      { title: "Download the result", description: "The file is saved with your original name and the new extension, for example holiday.jpg becomes holiday.webp." },
    ],
    useCases: [
      { title: "Making a favicon", description: "Convert a square logo to ICO to use as a website favicon or a Windows shortcut icon. Images larger than 256 pixels are scaled down to fit the ICO limit." },
      { title: "Shrinking images for a website", description: "Convert PNG or JPG files to WebP to get smaller files and faster pages, then keep a JPG copy for places that do not accept WebP." },
      { title: "Fixing upload errors", description: "Some portals only take JPG or PNG. Convert a WebP or BMP to the format the form asks for instead of re-taking the photo." },
      { title: "Flattening to a still GIF or BMP", description: "Produce a GIF or BMP when an older program, a legacy system or a printing workflow insists on it." },
    ],
    tips: [
      "Going from JPG to PNG does not restore detail that JPG compression already removed. PNG will keep the picture exactly as it is, but the file will usually get bigger, not better.",
      "JPG has no transparency. If your PNG or WebP has a transparent background and you need that kept, convert to PNG or WebP rather than JPG.",
      "GIF is limited to a small palette of colours, so photographs can look banded or blotchy as a GIF. Use it for simple graphics, not for photos.",
      "BMP files are uncompressed and can be many times larger than the same image as JPG or WebP. Use BMP only when something specifically requires it.",
      "For a crisp favicon, start from a square image of at least 256 x 256 pixels so that the ICO does not need to be enlarged.",
    ],
    faqs: [
      { q: "Is my image uploaded to a server?", a: "No. The image is read and re-encoded entirely in your browser using the canvas API. It never leaves your device." },
      { q: "Will converting reduce the quality?", a: "Converting to PNG, BMP or ICO does not add loss. JPG and WebP are saved at a high quality setting, which is visually close to the original but is still a lossy format. GIF reduces the colour palette." },
      { q: "Why does my ICO look smaller than the original?", a: "The ICO format stores sizes up to 256 x 256 pixels. Larger images are scaled down to fit while keeping the aspect ratio." },
      { q: "Can I convert several files at once?", a: "This tool converts one image at a time to keep things simple and fast on phones. Run it again for the next file." },
      { q: "Which format should I pick for a website?", a: "WebP is usually the smallest while still looking good, PNG is best for logos and screenshots with sharp edges, and JPG is best for ordinary photos when you need maximum compatibility." },
    ],
    relatedTools: [
      { name: "Image Compressor", slug: "compressor" },
      { name: "JPG to PNG", slug: "jpg-to-png" },
      { name: "WebP Converter", slug: "webp-converter" },
      { name: "Image Resizer", slug: "resizer" },
    ],
  },

  "timestamp-converter": {
    overview: [
      "A Unix timestamp is the number of seconds that have passed since 00:00:00 UTC on 1 January 1970, a moment known as the Unix epoch. Computers like this representation because a single number is easy to store, sort and compare, and it means the same instant everywhere in the world. People, on the other hand, cannot read 1700000000 and tell what day it is.",
      "This tool converts in both directions: paste a timestamp to see the date and time it stands for, or pick a date and time to get the matching timestamp. You can switch between seconds and milliseconds, which is the single most common source of confusion when working with timestamps.",
      "Conversion uses your browser's own date engine, so it is instant and nothing you type is sent anywhere. Dates are shown in your local timezone, while the timestamp itself never changes with timezone, because it always counts from the same UTC moment.",
    ],
    steps: [
      { title: "Pick seconds or milliseconds", description: "Unix and most backend systems use seconds (10 digits for current dates). JavaScript, Java and many APIs use milliseconds (13 digits)." },
      { title: "Convert a timestamp to a date", description: "Paste the number. The readable date and time appear straight away in your local timezone." },
      { title: "Convert a date to a timestamp", description: "Choose a date and time to get the timestamp you can paste into a query, a config file or a test." },
      { title: "Copy the result", description: "Copy the value you need and double-check the unit before you use it elsewhere." },
    ],
    useCases: [
      { title: "Reading log files and API responses", description: "Find out when an event actually happened when a log line or a JSON field shows only a raw number." },
      { title: "Checking token and cache expiry", description: "JWTs, cookies and caches often store an expiry as a timestamp. Convert it to see whether it is already in the past." },
      { title: "Writing database queries", description: "Turn a human date into the timestamp your database expects for a range filter such as created_at greater than a given value." },
      { title: "Scheduling and cron checks", description: "Verify that a scheduled job or a release time lands on the date and hour you intended." },
    ],
    tips: [
      "Count the digits. About 10 digits means seconds, about 13 digits means milliseconds. Reading a millisecond value as seconds gives a date tens of thousands of years in the future.",
      "A timestamp has no timezone. If two people see different clock times for the same timestamp, they are only seeing it in different local timezones.",
      "Negative timestamps are valid and represent dates before 1970.",
      "Some older systems store timestamps in a signed 32-bit integer, which runs out in January 2038. If you maintain such a system, use a 64-bit type for new fields.",
    ],
    faqs: [
      { q: "What timezone does the converted date use?", a: "The readable date is shown in your browser's local timezone. The timestamp itself is timezone independent and always refers to the same UTC instant." },
      { q: "Why is my converted date wildly wrong?", a: "Almost always a unit mix-up. If your number has 13 digits, switch the tool to milliseconds." },
      { q: "Does this tool send my data anywhere?", a: "No. All conversion is done locally with your browser's built-in JavaScript date functions." },
      { q: "What is the Unix epoch?", a: "It is the reference point, 1 January 1970 at 00:00:00 UTC, from which Unix time counts seconds." },
    ],
    relatedTools: [
      { name: "Date Difference Calculator", slug: "date-difference-calculator" },
      { name: "Age Calculator", slug: "age-calculator" },
      { name: "UUID Generator", slug: "uuid-generator" },
    ],
  },

  "lorem-ipsum-generator": {
    overview: [
      "Lorem ipsum is placeholder text that designers, developers and editors drop into layouts before the real copy exists. It is based on passages from a work by the Roman writer Cicero, but the words have been scrambled so that nobody is tempted to read it, which keeps attention on the typography, spacing and structure of the design rather than on the message.",
      "This generator produces filler text by words, sentences or paragraphs. Sentence and paragraph lengths vary from one run to the next, which looks much closer to natural writing than a fixed block of identical lines, and it makes it easier to spot how a layout copes with short and long content.",
      "Text is generated instantly on your device with no network request, so you can use it offline once the page has loaded and generate as much as you need without limits.",
    ],
    steps: [
      { title: "Choose the unit", description: "Select words, sentences or paragraphs depending on what you are filling: a button label, a card description or a full article body." },
      { title: "Set the amount", description: "Enter how many of that unit you want. Start small, then increase to test longer content." },
      { title: "Decide on the classic opening", description: "Tick the option to begin with the traditional first line if you want the familiar Lorem ipsum start." },
      { title: "Copy and paste", description: "Copy the generated text into your design tool, CMS, template or code editor." },
    ],
    useCases: [
      { title: "Website and app mock-ups", description: "Fill headings, cards and article areas so stakeholders can judge the layout before copywriting is finished." },
      { title: "Testing text overflow", description: "Check how long and short text wraps, truncates or breaks in buttons, tables, tooltips and responsive grids." },
      { title: "Seeding a CMS or template", description: "Populate a new theme or blog template with sample posts to review styling." },
      { title: "Typography samples", description: "Compare fonts, line heights and column widths using realistic paragraph shapes." },
    ],
    tips: [
      "Test with both very short and very long content. Real text is rarely the same length in every card, and layouts often break at the extremes.",
      "Replace placeholder text with real copy before launch. Placeholder text left on a live page looks unfinished and gives search engines nothing useful to index.",
      "If you need text in a specific length for a field, generate by words rather than paragraphs and trim to the exact count.",
      "Use fewer paragraphs for a quick look and more for scroll and pagination tests.",
    ],
    faqs: [
      { q: "Does lorem ipsum mean anything?", a: "Not as written. It is derived from Latin philosophy text but scrambled into nonsense on purpose so that it does not distract from the design." },
      { q: "Can I get the classic first line?", a: "Yes. Tick the option to start with the traditional opening line and the rest of the text is generated after it." },
      { q: "Is there a limit on how much I can generate?", a: "No fixed limit besides what your browser can comfortably display. The text is created locally." },
      { q: "Is the generated text random every time?", a: "Yes. Sentence and paragraph lengths vary on each run, so you will get different output when you generate again." },
    ],
    relatedTools: [
      { name: "Word Counter", slug: "word-counter" },
      { name: "Text Repeater", slug: "text-repeater" },
      { name: "Case Converter", slug: "case-converter" },
    ],
  },

  "image-to-base64": {
    overview: [
      "Base64 is a way of writing binary data, such as an image, using only plain text characters. Once an image is Base64 encoded it can be placed directly inside HTML, CSS, JSON or an email template as a data URI instead of being loaded from a separate file. That saves a network request for tiny images and lets you move an image through systems that only accept text.",
      "This tool works in both directions. Choose an image to get its Base64 string and a ready-to-use data URI, or paste a Base64 string to turn it back into a picture you can preview and download. All of it happens inside your browser and the image is never uploaded.",
      "Base64 is a convenience, not a compression method. It makes data about one third larger, so it is a good fit for small icons and logos and a poor one for large photographs.",
    ],
    steps: [
      { title: "Pick a mode", description: "Choose Image to Base64 to encode, or Base64 to Image to decode." },
      { title: "Add your image or paste your string", description: "Upload an image file, or paste a Base64 string or full data URI into the box." },
      { title: "Copy the output", description: "Copy the Base64 text or the CSS snippet for use in your stylesheet or HTML." },
      { title: "Or download the decoded image", description: "When decoding, check the preview and download the picture as a file." },
    ],
    useCases: [
      { title: "Inlining small icons in CSS", description: "Embed a tiny icon as a background-image data URI to avoid an extra request for a few hundred bytes." },
      { title: "Sending images through JSON APIs", description: "Many APIs accept images only as Base64 strings inside a JSON body." },
      { title: "HTML email templates", description: "Embed a small logo directly in an email template when linked images may be blocked." },
      { title: "Recovering an image from a string", description: "Decode a Base64 value copied from a log, a database field or an API response to see what it contains." },
    ],
    tips: [
      "Compress or resize the image first. Base64 adds roughly 33 percent to the file size, so smaller input means a smaller string.",
      "Keep inline images small, ideally a few kilobytes. Large data URIs bloat your HTML or CSS and cannot be cached separately by the browser.",
      "Make sure the data URI starts with the right type, for example data:image/png;base64, followed by the encoded text.",
      "When decoding, remove any line breaks or extra spaces that were added when the string was copied.",
    ],
    faqs: [
      { q: "Is my image uploaded anywhere?", a: "No. Encoding and decoding both happen locally in your browser." },
      { q: "What is a data URI?", a: "It is a string that starts with data:image/png;base64, followed by the encoded image. Browsers can use it directly as the source of an image or a CSS background." },
      { q: "Does Base64 make my image smaller?", a: "No. It makes the data about one third larger. Its purpose is to carry binary data as text, not to compress it." },
      { q: "Why does my decoded image fail to display?", a: "The string is probably incomplete, contains stray spaces or line breaks, or was copied without its full ending. Paste it again in one piece." },
    ],
    relatedTools: [
      { name: "Base64 Encoder/Decoder", slug: "base64" },
      { name: "Image Compressor", slug: "compressor" },
      { name: "Image Resizer", slug: "resizer" },
    ],
  },

  "uuid-generator": {
    overview: [
      "A UUID, or universally unique identifier, is a 128-bit value written as 32 hexadecimal characters in five groups, for example 123e4567-e89b-42d3-a456-426614174000. Software uses UUIDs to label database rows, uploaded files, sessions, devices and events without a central system having to hand out numbers, because the chance of two generated values matching is vanishingly small.",
      "This tool generates version 4 UUIDs, which are built from random numbers. In a v4 UUID, 122 of the 128 bits are random and the rest mark the version and variant. Randomness comes from your browser's Web Crypto generator, the same secure source that browsers use for security features, so the values are suitable for real projects and not only for tests.",
      "You can create from 1 to 50 at a time, switch hyphens on or off and choose upper or lower case, then copy a single UUID or the whole list. Nothing is stored or transmitted.",
    ],
    steps: [
      { title: "Set how many you need", description: "Choose a number from 1 to 50." },
      { title: "Pick the format", description: "Keep the standard hyphenated lowercase style, or turn hyphens off or uppercase on to match your system." },
      { title: "Generate", description: "Your UUIDs appear instantly. Press Regenerate whenever you want a fresh set." },
      { title: "Copy", description: "Click a single UUID to copy it, or use Copy all for the full list." },
    ],
    useCases: [
      { title: "Database primary keys", description: "Create IDs that do not collide across servers or services and do not reveal how many records exist." },
      { title: "Test data and API mocks", description: "Fill fixtures and mock responses with realistic unique identifiers." },
      { title: "Unique file names", description: "Name uploads with a UUID to avoid overwriting files with the same original name." },
      { title: "Correlation and request IDs", description: "Tag requests in logs so that one request can be followed across several services." },
    ],
    tips: [
      "UUID v4 values are random, so they are not in sorted order. Using them as a primary key can fragment some database indexes. If you need roughly time-ordered IDs, consider UUID v7 or ULID.",
      "A UUID is an identifier, not a secret. Do not rely on it alone as a password or an access token for sensitive data.",
      "Store UUIDs in your database's native UUID type where one exists, which is more compact than storing text.",
      "Pick one format, with or without hyphens and one case, and use it consistently across your system.",
    ],
    faqs: [
      { q: "Can two UUIDs ever be the same?", a: "In theory yes, in practice no. With 122 random bits the chance of a collision is so small that it is ignored in real systems." },
      { q: "Are these UUIDs safe to use in production?", a: "Yes. They come from the browser's cryptographically secure random generator, not from a weak pseudo-random function." },
      { q: "What is the difference between a UUID and a GUID?", a: "They are the same thing. GUID is the term commonly used in Microsoft environments." },
      { q: "Does this tool save or send my UUIDs?", a: "No. They are created in your browser and disappear when you close or refresh the page." },
    ],
    relatedTools: [
      { name: "Hash Generator", slug: "hash-generator" },
      { name: "Password Generator", slug: "password-generator" },
      { name: "Timestamp Converter", slug: "timestamp-converter" },
    ],
  },

  "text-to-speech": {
    overview: [
      "This tool reads any text out loud using the speech synthesis engine that is already built into your browser and operating system. The same technology powers screen readers and voice assistants. You choose a voice, adjust the speed and pitch and press Speak, with no account and no installation.",
      "Because the voices come from your device, the choice depends on what your system provides. Many devices include several languages and accents, and newer systems often ship natural-sounding voices. Since the voices are not part of the website, the same text may sound different on a phone, a laptop or another browser.",
      "Your text is spoken locally through the Web Speech API and is not sent to a server by this tool. It is a practical way to proofread by ear, to listen to long text while you do something else, or to hear how a sentence is pronounced.",
    ],
    steps: [
      { title: "Type or paste your text", description: "Enter the sentence, paragraph or article you want to hear." },
      { title: "Choose a voice", description: "Pick from the voices your browser offers. Try a few, as quality varies between voices and languages." },
      { title: "Adjust speed and pitch", description: "Slow the speech down for careful listening or speed it up to get through long text quickly." },
      { title: "Press Speak", description: "Playback starts right away. You can pause, resume or stop at any time." },
    ],
    useCases: [
      { title: "Proofreading by ear", description: "Listening to your writing exposes awkward phrasing, missing words and repeated words that are easy to skip while reading." },
      { title: "Accessibility and reading fatigue", description: "Have long content read aloud when reading on screen is difficult or tiring." },
      { title: "Language and pronunciation practice", description: "Hear how a word or sentence sounds in a voice for that language." },
      { title: "Listening on the move", description: "Paste an article and listen to it while commuting or doing chores." },
    ],
    tips: [
      "If a voice mispronounces a word, try spelling it more phonetically in your text, or choose a different voice.",
      "Pick a voice that matches the language of the text. A voice for one language reading another will sound strange.",
      "Add punctuation. Commas and full stops create natural pauses and make the speech easier to follow.",
      "For very long text, split it into sections so that it is easier to pause and resume where you left off.",
    ],
    faqs: [
      { q: "Can I download the audio?", a: "Yes, with Record and Prepare Download. It records this tab's audio while the text plays, so you must grant a one-time permission and tick Share tab audio. This works in Chrome and Edge on desktop only, because Firefox and Safari do not support tab audio capture." },
      { q: "Why are the available voices different on another device?", a: "Voices come from the operating system and browser, not from this website, so every device offers its own set." },
      { q: "Is my text sent to a server?", a: "No. Speech is generated on your device by the browser's built-in speech synthesis." },
      { q: "Why is there no sound?", a: "Check that your device volume and silent mode are off and that the browser tab is not muted. On some phones the first press may need a tap to allow audio." },
    ],
    relatedTools: [
      { name: "Word Counter", slug: "word-counter" },
      { name: "Character Counter", slug: "character-counter" },
      { name: "AI Content Detector", slug: "ai-content-detector" },
    ],
  },

  "hash-generator": {
    overview: [
      "A hash function turns any input, a short word or a multi-gigabyte file, into a fixed-length string called a hash or digest. The same input always produces the same hash, while even a one-character change produces a completely different one. That makes a hash behave like a fingerprint for data.",
      "This tool computes SHA-1, SHA-256, SHA-384 and SHA-512 hashes of text you type or a file you choose and shows all four at once. They are 40, 64, 96 and 128 hexadecimal characters long respectively. Hashing uses the Web Crypto API built into your browser, so files are processed on your device and are not uploaded.",
      "Hashes are one-way. You cannot turn a hash back into the original, which is why they are used for integrity checks and for storing fingerprints rather than for hiding data.",
    ],
    steps: [
      { title: "Choose text or file", description: "Switch between hashing typed text and hashing a file from your device." },
      { title: "Enter your input", description: "Type or paste text, or select a file. The hashes are calculated immediately." },
      { title: "Pick the algorithm", description: "SHA-256 is the usual choice. Use another only if the system you are comparing against requires it." },
      { title: "Copy or compare", description: "Copy the hash, or compare it with a published checksum to see whether they match exactly." },
    ],
    useCases: [
      { title: "Verifying downloads", description: "Compare the hash of a downloaded installer or ISO with the one published by the vendor to confirm it was not corrupted or altered." },
      { title: "Detecting duplicate files", description: "Two files with the same SHA-256 hash are, for all practical purposes, identical." },
      { title: "Integrity records", description: "Store a hash next to important data so that you can later prove it has not changed." },
      { title: "Learning and debugging", description: "See how a tiny change to the input completely changes the output, or reproduce a hash that an application produced." },
    ],
    tips: [
      "Hashes are case-insensitive hexadecimal, but compare the whole string carefully. A single different character means the files differ.",
      "Do not use a plain fast hash such as SHA-256 on its own to store user passwords. Use a purpose-built password hashing function such as bcrypt, scrypt or Argon2, with a salt.",
      "Hidden characters matter. A trailing space or a line break in text input produces a different hash.",
      "SHA-1 is considered weak against deliberate attacks. Prefer SHA-256 or stronger for anything security related.",
    ],
    faqs: [
      { q: "Why is MD5 not offered?", a: "MD5 is broken for security purposes and is not supported by the browser's Web Crypto API. SHA-256 is a safer and equally practical alternative." },
      { q: "Is my file uploaded?", a: "No. The file is read and hashed in your browser and never leaves your device." },
      { q: "Which algorithm should I use?", a: "SHA-256 is the default for general use. Use SHA-1 only for compatibility with older systems." },
      { q: "Can a hash be reversed to get my text back?", a: "No. Hashing is one way. The only way to find the original is to guess inputs and hash them until one matches." },
    ],
    relatedTools: [
      { name: "UUID Generator", slug: "uuid-generator" },
      { name: "Base64 Encoder/Decoder", slug: "base64" },
      { name: "Password Generator", slug: "password-generator" },
    ],
  },

  "pdf-to-word": {
    overview: [
      "A PDF is built to look the same everywhere, which is exactly why it is awkward to edit. This tool pulls the text out of a PDF page by page and places it in a downloadable Word (.docx) document, so you have editable content to start from instead of retyping a letter, a report or a set of notes.",
      "It is important to be clear about what this does and does not do. It extracts the text only. Fonts, exact spacing, images, tables, multiple columns and the original page design are not recreated, so the result is a plain, editable version of the words, not a pixel-perfect Word copy of the layout.",
      "Extraction is done in your browser with PDF.js. Your document is read on your own device and is never uploaded, which is useful for contracts, application forms and other files you would rather not hand to a third-party server.",
    ],
    steps: [
      { title: "Add your PDF", description: "Click the upload area or drag a PDF file onto it. Use a PDF that contains real, selectable text." },
      { title: "Convert", description: "The text is read from each page in turn. Longer documents take a little longer." },
      { title: "Download the .docx", description: "Save the Word file and open it in Word, Google Docs or any compatible editor." },
      { title: "Tidy up", description: "Fix headings, spacing and lists as needed. Tables and columns usually need manual rebuilding." },
    ],
    useCases: [
      { title: "Editing text that only exists as a PDF", description: "Get a starting draft of a letter, a report or a policy when the original file is lost." },
      { title: "Reusing quotes and paragraphs", description: "Pull wording out of a document for notes or a summary without copying page by page." },
      { title: "Preparing text for translation or proofreading", description: "Hand editors or translators a text file they can mark up easily." },
      { title: "Searching and analysing content", description: "Move text into a tool that can count words, search, or compare versions." },
    ],
    tips: [
      "Check that you can select text in your PDF first. If you cannot highlight words with your cursor, the file is a scan and has no text for this tool to extract.",
      "For scanned pages, run the pages through an OCR tool such as Image to Text first, and then paste the result into a document.",
      "Documents with tables, columns or forms need the most cleanup. Expect to rebuild those parts by hand.",
      "Keep the original PDF. The Word file is a working copy, not a faithful replacement.",
    ],
    faqs: [
      { q: "Will the formatting of my PDF be kept?", a: "No. Only plain text is extracted. Fonts, layout, images and tables are not recreated in the Word file." },
      { q: "Why does the tool say no text was found?", a: "The PDF is probably a scanned image of pages, so there is no real text to read. Use the Image to Text (OCR) tool for scanned documents." },
      { q: "Is my PDF uploaded anywhere?", a: "No. Text extraction happens in your browser and the file stays on your device." },
      { q: "Can it convert password protected PDFs?", a: "No. Remove the password protection in the program that created the file, then try again." },
    ],
    relatedTools: [
      { name: "Image to Text (OCR)", slug: "image-to-text" },
      { name: "PDF Compressor", slug: "pdf-compressor" },
      { name: "Merge PDF", slug: "pdf-merge" },
      { name: "Word Counter", slug: "word-counter" },
    ],
  },

  "pdf-compressor": {
    overview: [
      "PDFs that contain scans or lots of photographs can grow to many megabytes, which causes trouble with email attachment limits, upload forms and slow connections. This tool reduces the size of such a PDF by drawing each page as an image, compressing that image, and building a new PDF from the compressed pages.",
      "That approach works best on image-heavy and scanned documents, where most of the weight is pictures. It is a real trade-off and not a free lunch: because every page becomes a picture of itself, the text in the output PDF can no longer be selected, searched or copied.",
      "All of the work, from drawing the pages to rebuilding the file, runs in your browser with WebAssembly-based PDF libraries. Nothing is uploaded to a server, so documents such as ID scans, certificates and signed forms stay on your device.",
    ],
    steps: [
      { title: "Add your PDF", description: "Click the upload area or drag a PDF file onto it." },
      { title: "Choose a compression level", description: "Smallest size shrinks the most, Best quality keeps more detail, and Balanced sits between them." },
      { title: "Compress", description: "Each page is rendered and re-compressed. Large files may take a while on a phone." },
      { title: "Compare and download", description: "Check the before and after sizes, then download the result. If it is too blurry, try a higher quality level." },
    ],
    useCases: [
      { title: "Scanned documents", description: "Photos or scans of paper pages usually shrink a lot with this method." },
      { title: "Email attachment limits", description: "Reduce a PDF enough to fit under the size cap of an email provider or a portal." },
      { title: "Application and exam portals", description: "Many government and job portals set strict maximum file sizes for uploads." },
      { title: "Faster sharing", description: "A smaller file uploads and downloads faster on slow mobile connections." },
    ],
    tips: [
      "Start with Balanced. Only use Smallest size if you need the tiniest file and can accept visible softening of text and images.",
      "If your PDF was exported from Word or a similar program and is mostly text, it is already small, so this tool will not reduce it much.",
      "Keep your original. The compressed copy has no selectable text, so you will want the original for searching or editing.",
      "Check the result at normal zoom before sending it. Small print and signatures are the first things to suffer from heavy compression.",
    ],
    faqs: [
      { q: "Will I still be able to select the text afterwards?", a: "No. Every page becomes a compressed image, so text can no longer be selected, searched or copied in the output." },
      { q: "Is my PDF uploaded to a server?", a: "No. Rendering and compression both take place in your browser." },
      { q: "Why did my file barely get smaller?", a: "If the PDF is mostly real text with few images, there is little to compress, because text based PDFs are already compact." },
      { q: "Which level should I choose?", a: "Balanced is the best starting point. Move to Smallest size for strict limits, or Best quality when detail matters." },
    ],
    relatedTools: [
      { name: "PDF to Word", slug: "pdf-to-word" },
      { name: "Merge PDF", slug: "pdf-merge" },
      { name: "Split PDF", slug: "pdf-split" },
      { name: "Image Compressor", slug: "compressor" },
    ],
  },

  "video-to-gif": {
    overview: [
      "An animated GIF plays automatically and loops in almost any chat, forum, document or web page without anyone pressing play, which makes it a handy way to share a short moment from a video. This tool trims a section of your video and turns it into an animated GIF.",
      "Instead of a quick single-pass conversion, it uses FFmpeg's two-pass palette method. First it analyses your clip and builds a colour palette tailored to it, then it encodes the GIF against that palette. GIFs are limited to 256 colours, so a palette chosen for your clip gives noticeably cleaner colours and less banding than a generic one.",
      "Everything runs in your browser through WebAssembly. The video is not uploaded anywhere, so clips from private recordings stay on your device. Clips are limited to 15 seconds because GIF file sizes grow very quickly with length.",
    ],
    steps: [
      { title: "Add your video", description: "Click the upload area or drag a video file onto it." },
      { title: "Pick the moment", description: "Use the start time and length controls to choose the part you want, up to 15 seconds." },
      { title: "Choose a quality preset", description: "Small, Medium or Large. Higher quality gives a sharper GIF and a bigger file." },
      { title: "Create and download", description: "Press Create GIF, preview the result and download it." },
    ],
    useCases: [
      { title: "Reaction and highlight GIFs", description: "Turn a funny or memorable moment into something you can drop into a chat." },
      { title: "Product and UI demos", description: "A short looping clip in a README or help article often explains a flow better than a static screenshot." },
      { title: "Tutorials and how-tos", description: "Show one step of a process, such as where to click, in a few seconds of motion." },
      { title: "Social and messaging", description: "Some apps display autoplaying GIFs more smoothly than video attachments." },
    ],
    tips: [
      "Shorter is better. A 2 to 5 second clip gives the best balance of size and quality.",
      "Small is usually enough for chats and forums. Use Large only when the GIF is the main content on a page.",
      "Clips with big flat areas of colour compress better than footage with lots of fine detail and noise.",
      "If you need sound or a longer clip, share the video itself, since GIFs have no audio.",
    ],
    faqs: [
      { q: "Is my video uploaded anywhere?", a: "No. The clip is trimmed and converted inside your browser." },
      { q: "Why is there a 15 second limit?", a: "GIF files grow very large very fast as clips get longer. The limit keeps results usable and quick to load." },
      { q: "Why do these GIFs look better than ones from other converters?", a: "A custom colour palette is generated for your clip with a two pass process instead of using a generic fixed palette." },
      { q: "Does the GIF include sound?", a: "No. The GIF format does not support audio." },
    ],
    relatedTools: [
      { name: "Video Compressor", slug: "video-compressor" },
      { name: "MOV to MP4", slug: "mov-to-mp4" },
      { name: "Image Compressor", slug: "compressor" },
    ],
  },

  "mov-to-mp4": {
    overview: [
      "MOV is the container that iPhones, iPads and QuickTime record in by default. It plays well on Apple devices, but Windows programs, Android phones and many websites and editors either refuse it or handle it poorly, and they usually expect MP4 instead.",
      "This tool converts a MOV file to a standard MP4 with H.264 video and AAC audio, which is the most widely supported combination across devices, browsers and platforms. The conversion runs in your browser through a WebAssembly build of FFmpeg, so the video is never uploaded.",
      "Because it is a genuine re-encode and not just a renamed file, it can also solve problems such as videos that appear sideways or will not play in some non-Apple players.",
    ],
    steps: [
      { title: "Add your MOV file", description: "Click the upload area or drag a .mov file from your iPhone, iPad or Mac onto it." },
      { title: "Wait for the conversion", description: "A progress bar shows how far along the job is. It runs on your own device." },
      { title: "Preview", description: "When it finishes, play the result in the page to check picture and sound." },
      { title: "Download the MP4", description: "Save the file and use it anywhere MP4 is accepted." },
    ],
    useCases: [
      { title: "Sharing iPhone videos", description: "Send clips to friends on Android or Windows that open without codec errors." },
      { title: "Uploading to websites", description: "Many upload forms, LMS platforms and editors accept MP4 but reject MOV." },
      { title: "Video editing on Windows", description: "Some editing programs import MP4 more reliably than MOV." },
      { title: "Fixing playback problems", description: "Convert a MOV that will not open in a non-Apple player." },
    ],
    tips: [
      "If you also need a smaller file, run the MP4 through the Video Compressor afterwards.",
      "Long or high resolution videos take longer because your own device does the work. A desktop browser is faster than a phone.",
      "Keep the original MOV until you have checked that the MP4 plays correctly.",
      "Close other heavy tabs and apps when converting large files to avoid slowdowns.",
    ],
    faqs: [
      { q: "Is my video uploaded to a server?", a: "No. Conversion runs in your browser with WebAssembly and the file stays on your device." },
      { q: "Will I lose quality?", a: "The conversion uses a high quality setting (CRF 20), so any loss is small and usually not noticeable in normal viewing." },
      { q: "Is the audio kept?", a: "Yes. Audio is converted to AAC and included in the MP4." },
      { q: "Is there a file size limit?", a: "There is no fixed limit, but very large files, roughly 250 MB and above, can be slow on phones. Use a desktop browser for those." },
    ],
    relatedTools: [
      { name: "Video Compressor", slug: "video-compressor" },
      { name: "Video to GIF", slug: "video-to-gif" },
      { name: "Image Converter", slug: "image-converter" },
    ],
  },
};

import { ToolContentData } from "@/components/ToolContentSection";

export const toolContent: Record<string, ToolContentData> = {
  compressor: {
    overview: [
      "Large photo files are one of the most common reasons a webpage loads slowly, an email bounces back, or a form upload fails silently. A single photo straight off a modern phone camera can easily be 4-8MB, while most websites and forms expect something closer to 100-500KB. The Image Compressor shrinks JPG and PNG files by adjusting the compression quality, cutting file size by up to 90% while keeping the photo sharp enough for everyday use.",
      "Unlike desktop compression software, everything here happens using your browser's built-in Canvas API. The image is decoded, re-encoded at the quality level you choose, and immediately offered back as a download — there's no waiting room, no queue, and no copy of your photo sitting on a remote server in the meantime.",
      "This makes the tool a practical middle step in almost any workflow that ends with sharing a photo online: before attaching it to an email, before uploading it to a blog post, or before submitting it through a form with a strict size limit.",
    ],
    steps: [
      { title: "Upload your image", description: "Click the upload area or drag a JPG/PNG file directly onto it." },
      { title: "Adjust the quality slider", description: "Drag left for a smaller file, right for higher fidelity. The preview updates live." },
      { title: "Compare the sizes", description: "The Original Size and Compressed Size cards show the exact reduction percentage." },
      { title: "Download the result", description: "Click Download to save the compressed file straight to your device." },
    ],
    useCases: [
      { title: "Faster website pages", description: "Smaller hero images and blog photos reduce page load time, which affects both user experience and Google's page speed ranking factors." },
      { title: "Email attachment limits", description: "Most email providers cap attachments around 20-25MB; compressing photos first avoids the classic 'message too large' bounce-back." },
      { title: "Form upload restrictions", description: "Job portals, government forms, and marketplace listings often reject files above a size cap — compression gets you under the limit without cropping content out." },
      { title: "Saving device storage", description: "Compressing a large batch of camera photos before archiving them frees up meaningful space on a phone or cloud storage plan." },
    ],
    tips: [
      "Start around 75-80% quality — it's usually the sweet spot where file size drops significantly with no visible loss.",
      "Compress a copy, not your only file, so you always have the original if you need it for print later.",
      "PNG screenshots with lots of flat color compress less dramatically than photos; consider converting to JPG first if quality loss is acceptable.",
      "If a compressed image still looks fine at 50% quality on your screen, it will almost certainly look fine to site visitors too.",
    ],
    faqs: [
      { q: "Does compression happen on a server?", a: "No — everything runs locally in your browser using the Canvas API, so the image file is never uploaded anywhere." },
      { q: "Will compressing an image damage the original file?", a: "No, compression creates a new output file; your original upload is left untouched on your device." },
      { q: "Can I compress PNG images the same way as JPG?", a: "Yes, both formats are supported, though PNG files with large flat-color areas tend to compress less than photographic JPGs." },
      { q: "What's a safe quality setting for web use?", a: "Around 70-85% quality typically balances small file size with no noticeable visual difference for most photos." },
      { q: "Is there a maximum file size I can upload?", a: "There's no hard-coded limit, but very large files depend on your device's available memory since processing happens locally." },
    ],
    relatedTools: [
      { name: "Image Resizer", slug: "resizer" },
      { name: "JPG to PNG", slug: "jpg-to-png" },
      { name: "PNG to JPG", slug: "png-to-jpg" },
      { name: "Image Size Checker", slug: "image-size-checker" },
    ],
  },

  resizer: {
    overview: [
      "Every platform that accepts an image has its own idea of the 'right' size — Instagram wants a square, a website banner wants something wide, and a passport-style upload form wants an exact pixel count. Uploading a mismatched image usually results in an automatic and often unflattering crop, or an outright rejection.",
      "The Image Resizer reads your photo's exact width and height, then lets you type in new dimensions while an aspect-ratio lock keeps the proportions correct. That lock is what prevents a resized photo from looking stretched or squeezed — change the width, and the height adjusts automatically to match, or vice versa.",
      "Because resizing runs directly in your browser using canvas redrawing, there's no upload delay and no dependency on a third-party server being available. You see the new dimensions and can download the result within seconds.",
    ],
    steps: [
      { title: "Upload your photo", description: "The tool reads its current width and height automatically." },
      { title: "Enter new dimensions", description: "Type a width or height in pixels; the locked ratio keeps proportions correct." },
      { title: "Unlock the ratio if needed", description: "Click the lock icon if you deliberately want a non-proportional size, like a banner crop." },
      { title: "Preview and download", description: "Click Preview Resize, confirm it looks right, then download the resized file." },
    ],
    useCases: [
      { title: "Social media posts", description: "Match exact platform dimensions — 1080×1080 for Instagram, 1200×630 for link previews — so images display without unwanted cropping." },
      { title: "E-commerce listings", description: "Marketplaces often require product photos within a specific pixel range; resizing avoids listing rejections." },
      { title: "Presentation slides", description: "Fit a photo cleanly into a 1920×1080 slide without it overflowing the frame or appearing tiny." },
      { title: "Website performance", description: "Serving an image at the actual display size, rather than a much larger original, reduces unnecessary bandwidth use." },
    ],
    tips: [
      "Downscaling (making an image smaller) rarely loses noticeable quality; upscaling a small image significantly often looks soft.",
      "Keep the aspect ratio locked unless you specifically need a stretched or squeezed result.",
      "Resize before you compress for the smallest possible final file size.",
      "For social posts, check the platform's current recommended dimensions since they occasionally change.",
    ],
    faqs: [
      { q: "Will resizing make my photo blurry?", a: "Shrinking a photo rarely causes visible quality loss; enlarging a small photo significantly can look soft since no new detail is created." },
      { q: "What happens if I unlock the aspect ratio?", a: "You can set width and height independently, but the image may look stretched or squeezed if the new ratio differs a lot from the original." },
      { q: "Does this tool upload my photo anywhere?", a: "No, resizing happens locally in your browser; the file never leaves your device." },
      { q: "Can I resize to an exact pixel size like 200×230?", a: "Yes, type the exact width and height you need, unlocking the aspect ratio first if the target isn't proportional to the original." },
    ],
    relatedTools: [
      { name: "Image Compressor", slug: "compressor" },
      { name: "Image Cropper", slug: "image-cropper" },
      { name: "Image Size Checker", slug: "image-size-checker" },
      { name: "YouTube Thumbnail Converter", slug: "youtube-thumbnail-converter" },
    ],
  },

  "jpg-to-png": {
    overview: [
      "JPG and PNG solve different problems. JPG uses lossy compression tuned for photographic detail, producing small files but discarding some data every time it's re-saved. PNG uses lossless compression and supports transparency, which makes it the better choice for logos, graphics with sharp edges, or any image that will be edited and re-saved multiple times.",
      "Converting a JPG to PNG is useful specifically in situations where you need those PNG properties — placing a photo over a colored background in a design tool that expects transparency-capable input, or preparing a file for repeated editing without accumulating compression artifacts.",
      "This converter reads the JPG pixel-by-pixel using an HTML canvas and re-encodes it as PNG, so the visual result is identical to the source; no new compression artifacts are introduced during the conversion itself.",
    ],
    steps: [
      { title: "Upload your JPG file", description: "Select or drag a .jpg or .jpeg image into the upload area." },
      { title: "Click Convert to PNG", description: "The browser redraws the image onto a canvas and re-exports it as PNG." },
      { title: "Review the format cards", description: "Confirm the input shows JPG and the output shows PNG." },
      { title: "Download the PNG", description: "Save the converted file, which keeps the original filename with a .png extension." },
    ],
    useCases: [
      { title: "Design software compatibility", description: "Some design and editing tools expect PNG input specifically when transparency layers will be added later." },
      { title: "Repeated editing", description: "Avoid the accumulating quality loss that comes from re-saving a JPG multiple times during a long editing session." },
      { title: "Icon or logo preparation", description: "Convert a photographed or scanned logo to PNG before placing it into other lossless-format design assets." },
      { title: "Archival copies", description: "Keep a lossless master copy of an important photo alongside the original JPG." },
    ],
    tips: [
      "Converting to PNG does not add transparency automatically — the background stays whatever it was in the original JPG.",
      "Expect the PNG file to be larger than the source JPG; this is normal since PNG doesn't discard data.",
      "For photos meant purely for web display, JPG or WebP is usually still the more practical final format.",
      "Use PNG when the image will be edited multiple times, to avoid repeated lossy re-compression.",
    ],
    faqs: [
      { q: "Does converting JPG to PNG add transparency?", a: "No — a JPG has no transparency data to begin with, so the PNG output keeps the same solid background." },
      { q: "Why is my PNG file bigger than the original JPG?", a: "PNG's lossless compression typically produces larger files than JPG's lossy compression, especially for photos with lots of color detail." },
      { q: "Is any quality lost during this conversion?", a: "No additional quality is lost in the JPG-to-PNG step itself; the existing pixel data is copied into the new format as-is." },
      { q: "Can I convert multiple JPGs at once?", a: "This tool processes one image at a time to keep the preview and download experience simple and fast." },
    ],
    relatedTools: [
      { name: "PNG to JPG", slug: "png-to-jpg" },
      { name: "Image Compressor", slug: "compressor" },
      { name: "WebP Converter", slug: "webp-converter" },
      { name: "SVG to PNG", slug: "svg-to-png" },
    ],
  },

  "png-to-jpg": {
    overview: [
      "PNG files, especially screenshots and graphics, can be several times larger than a JPG of the same image, since PNG's lossless compression doesn't discard any visual data. That difference matters when file size directly affects page load speed, email deliverability, or storage costs.",
      "This converter flattens any transparent areas in your PNG onto a white background — since JPG has no transparency channel — and re-encodes the result at 92% quality, a level where compression artifacts are rarely visible but the size reduction is substantial.",
      "The trade-off is worth understanding: PNG remains the better format for logos, icons, and text-heavy graphics with hard edges, while JPG is generally the better choice for photographs meant to be shared or displayed on the web.",
    ],
    steps: [
      { title: "Upload your PNG file", description: "Select or drag a .png image into the upload area." },
      { title: "Click Convert to JPG", description: "The browser flattens transparency to white and re-encodes at high quality." },
      { title: "Check the resulting file size", description: "The success message shows the exact size of your new JPG file." },
      { title: "Download the JPG", description: "Save the converted file to your device." },
    ],
    useCases: [
      { title: "Reducing screenshot file size", description: "Screenshots saved as PNG are often unnecessarily large for sharing in chats or emails; JPG shrinks them significantly." },
      { title: "Website image optimization", description: "Photographic content displays fine as JPG at a fraction of the PNG file size, improving page load times." },
      { title: "Email attachments", description: "Smaller JPG files are less likely to hit attachment size limits than the equivalent PNG." },
      { title: "Bulk photo archiving", description: "Converting a folder of PNG photos to JPG can meaningfully reduce total storage used." },
    ],
    tips: [
      "If your PNG has transparency you need to keep, this conversion isn't the right tool — transparency will be lost.",
      "For logos or text-heavy graphics, keep them as PNG; JPG compression can blur sharp edges.",
      "92% quality is a safe default; further compress the resulting JPG afterward if you need an even smaller file.",
      "Always keep the original PNG if you might need transparency again later.",
    ],
    faqs: [
      { q: "What happens to transparent areas in my PNG?", a: "Since JPG has no transparency channel, any transparent or semi-transparent pixels are filled with white before conversion." },
      { q: "Why choose JPG over PNG for photos?", a: "JPG's lossy compression is tuned for photographic detail and typically produces much smaller files than PNG for the same photo." },
      { q: "Is this a good idea for logos or text-heavy images?", a: "Not usually — PNG is better for logos, icons, and screenshots with sharp text, since JPG compression can blur hard edges." },
      { q: "What quality level does the conversion use?", a: "The converter uses 92% JPG quality by default, a level where visible artifacts are minimal while file size drops noticeably." },
    ],
    relatedTools: [
      { name: "JPG to PNG", slug: "jpg-to-png" },
      { name: "Image Compressor", slug: "compressor" },
      { name: "WebP Converter", slug: "webp-converter" },
      { name: "Image Size Checker", slug: "image-size-checker" },
    ],
  },

  "image-to-pdf": {
    overview: [
      "Job applications, visa submissions, and school forms frequently ask for a single PDF rather than several loose image files. Combining scattered photos into one document manually usually means opening a PDF editor or a scanner app — both extra steps for what should be a quick task.",
      "This tool lets you add multiple images, arrange them in order, and generates a single PDF with each image on its own page, sized to fit while preserving the original aspect ratio. No design software or physical scanner is required.",
      "Because the PDF is generated entirely in your browser using a JavaScript PDF library, your images are never uploaded — the finished PDF is assembled locally and offered straight to you as a download.",
    ],
    steps: [
      { title: "Add your images", description: "Click to select or drag multiple JPG/PNG files into the tool." },
      { title: "Arrange the order", description: "Reorder the thumbnails so pages appear in the sequence you want." },
      { title: "Remove any unwanted images", description: "Click the X on a thumbnail to drop it before converting." },
      { title: "Convert and download", description: "Click Convert to PDF, then download the finished multi-page document." },
    ],
    useCases: [
      { title: "Document submissions", description: "Combine scanned ID pages, certificates, or forms into a single PDF for a job or visa application." },
      { title: "Assignment uploads", description: "Merge photographed pages of handwritten homework into one file to submit through a school portal." },
      { title: "Portfolio compilation", description: "Assemble a set of design or photography samples into a shareable PDF." },
      { title: "Receipt and invoice archiving", description: "Combine photos of paper receipts into a single PDF for expense reporting." },
    ],
    tips: [
      "Arrange images in the exact order you want before converting — reordering after generating the PDF isn't possible.",
      "Photograph documents in good lighting and straight-on for the clearest results in the final PDF.",
      "Very large batches of high-resolution photos take longer to process since everything runs in your browser.",
      "Compress oversized photos first if the resulting PDF file feels too large to attach or upload.",
    ],
    faqs: [
      { q: "Can I mix JPG and PNG images in the same PDF?", a: "Yes, you can combine different image formats freely — each is placed on its own PDF page regardless of file type." },
      { q: "Is there a limit on how many images I can add?", a: "There's no hard-coded limit, though very large batches take longer to process since everything runs in your browser." },
      { q: "Will the images be compressed in the PDF?", a: "Images are placed at a size that fits the page while preserving their aspect ratio, without deliberately re-compressing them further." },
      { q: "Can I remove a page after adding it?", a: "Yes, click the X on any thumbnail to remove it from the list before generating the final PDF." },
    ],
    relatedTools: [
      { name: "PDF Merge", slug: "pdf-merge" },
      { name: "PDF to Image", slug: "pdf-to-image" },
      { name: "PDF Split", slug: "pdf-split" },
      { name: "Image Compressor", slug: "compressor" },
    ],
  },

  "webp-converter": {
    overview: [
      "WebP is a modern image format developed by Google that typically produces 25-35% smaller files than JPG or PNG at comparable visual quality. That efficiency is one of the reasons Google PageSpeed Insights and Core Web Vitals reports frequently suggest serving images in 'next-gen formats' when auditing a site.",
      "Converting existing JPG or PNG assets to WebP before uploading them to a website can noticeably improve page load speed, particularly on mobile connections where every kilobyte counts toward how quickly a page becomes usable.",
      "This tool reads your image and re-encodes it directly to WebP using your browser's native image encoding support, so there's no separate installation step or command-line tool required.",
    ],
    steps: [
      { title: "Upload a JPG or PNG image", description: "Select or drag your source image into the tool." },
      { title: "Click Convert to WebP", description: "The browser re-encodes the image into the WebP format." },
      { title: "Compare file sizes", description: "The output typically shows a noticeably smaller size than the original." },
      { title: "Download the WebP file", description: "Save the converted image for use on your website or app." },
    ],
    useCases: [
      { title: "Website performance optimization", description: "Serve smaller image files to improve Core Web Vitals scores and page load times." },
      { title: "Reducing hosting bandwidth", description: "Smaller WebP files mean less data transferred per page view, which can reduce hosting costs at scale." },
      { title: "App asset optimization", description: "Ship lighter image assets in web apps without a visible drop in quality." },
      { title: "SEO improvements", description: "Faster-loading pages tend to perform better in search ranking factors tied to page experience." },
    ],
    tips: [
      "Always keep an original JPG/PNG copy — WebP is best used as a delivery format, not necessarily your only archive.",
      "Test WebP images visually at 100% zoom before publishing, since compression artifacts vary by source image.",
      "Combine WebP conversion with compression for the smallest realistic file size.",
      "Check that your website's content management system or server correctly serves WebP with appropriate fallbacks for very old browsers.",
    ],
    faqs: [
      { q: "Do all browsers support WebP?", a: "Yes, all major modern browsers — Chrome, Firefox, Safari, and Edge — support WebP, making it safe to use on most public-facing websites today." },
      { q: "Does WebP support transparency like PNG?", a: "Yes, WebP supports an alpha channel, so images with transparent backgrounds convert without losing that transparency." },
      { q: "How much smaller will my file be?", a: "Typical reductions are 25-35% compared to JPG or PNG at similar visual quality, though the exact amount depends on the image content." },
      { q: "Can I convert WebP back to JPG or PNG?", a: "Yes, use the PNG to JPG or other converters after downloading; WebP is not a one-way format." },
    ],
    relatedTools: [
      { name: "Image Compressor", slug: "compressor" },
      { name: "JPG to PNG", slug: "jpg-to-png" },
      { name: "PNG to JPG", slug: "png-to-jpg" },
      { name: "SVG to PNG", slug: "svg-to-png" },
    ],
  },

  "heic-to-jpg": {
    overview: [
      "iPhones save photos in HEIC format by default because it compresses more efficiently than JPG while preserving comparable quality. The trade-off is compatibility: many Windows PCs, older Android devices, and countless web upload forms simply don't recognize .heic files, leaving you with a photo that looks like a blank icon everywhere except on Apple devices.",
      "This converter reads a HEIC file directly in the browser and re-encodes it as a standard JPG, restoring compatibility instantly. It's the fastest fix for the moment you try to email a phone photo to someone on Windows, or upload it to a website that rejects the format outright.",
      "Since decoding happens locally using a HEIC-compatible library loaded into the page, your photo is never transmitted to a server just to be converted — the entire process happens on your own device.",
    ],
    steps: [
      { title: "Upload your HEIC photo", description: "Select or drag the .heic file from your device or photo library export." },
      { title: "Wait for the preview to load", description: "The browser decodes the HEIC data and renders a JPG preview." },
      { title: "Check the image looks correct", description: "Confirm colors and orientation match the original before downloading." },
      { title: "Download the JPG", description: "Save the converted file, now compatible with virtually any device or website." },
    ],
    useCases: [
      { title: "Sending photos to Windows users", description: "Convert before emailing or messaging so the recipient can actually open the photo without extra software." },
      { title: "Uploading to websites and forms", description: "Many upload forms silently reject HEIC; converting first avoids a confusing failed upload." },
      { title: "Printing at photo kiosks", description: "Most in-store photo printing kiosks expect JPG rather than HEIC input." },
      { title: "Archiving in cross-platform cloud storage", description: "Some cloud services and shared drives display JPG thumbnails more reliably than HEIC." },
    ],
    tips: [
      "Change your iPhone's camera format to 'Most Compatible' under Settings → Camera → Formats to save new photos directly as JPG going forward.",
      "Keep the original HEIC if storage space allows, since it's typically smaller than the converted JPG.",
      "Batch-export photos from your Photos app before converting several at once.",
      "Check photo orientation after conversion, since some viewers handle HEIC rotation metadata differently.",
    ],
    faqs: [
      { q: "Can I avoid this issue by changing my iPhone's camera settings?", a: "Yes — under Settings → Camera → Formats, choosing 'Most Compatible' saves new photos directly as JPG, though this tool is still useful for HEIC photos you already have." },
      { q: "Does converting to JPG reduce photo quality?", a: "There's a small quality trade-off since JPG uses different compression than HEIC, but at normal viewing sizes the difference is rarely noticeable." },
      { q: "Why won't my HEIC file open on my computer?", a: "HEIC support isn't built into every operating system and photo viewer by default, especially on older Windows and Android versions." },
      { q: "Is my photo uploaded to convert it?", a: "No, the HEIC file is decoded and re-encoded entirely within your browser." },
    ],
    relatedTools: [
      { name: "JPG to PNG", slug: "jpg-to-png" },
      { name: "Image Compressor", slug: "compressor" },
      { name: "Image Resizer", slug: "resizer" },
      { name: "WebP Converter", slug: "webp-converter" },
    ],
  },

  "image-cropper": {
    overview: [
      "Cropping is often the single most useful edit for a photo — removing distracting background, tightening the frame around a subject, or reshaping an image to fit a specific slot like a square profile picture or a wide banner. It's also one of the few edits that genuinely can't be undone by resizing alone.",
      "This tool overlays an adjustable crop box directly on your uploaded image. Drag the corner handle to resize the selection, drag the box itself to reposition it, and watch the live preview update as you adjust — what you see is exactly what gets exported.",
      "Because cropping only needs to read pixel data and redraw a selected region to a new canvas, the entire operation completes instantly in your browser without any server round-trip.",
    ],
    steps: [
      { title: "Upload your image", description: "Select or drag the photo you want to crop." },
      { title: "Drag the crop box", description: "Position it over the area you want to keep." },
      { title: "Resize using the corner handle", description: "Adjust the box size while watching the live preview." },
      { title: "Crop and download", description: "Confirm the selection, then download just that cropped region as a new image." },
    ],
    useCases: [
      { title: "Profile pictures", description: "Crop a wider photo down to a tight square or circular-safe frame for social media profiles." },
      { title: "Removing distracting background", description: "Tighten the frame around a product or subject to eliminate clutter." },
      { title: "Fitting a specific ratio", description: "Crop to match a banner, thumbnail, or document photo's required proportions." },
      { title: "Focusing attention", description: "Cut out everything except the part of the image that matters most to the viewer." },
    ],
    tips: [
      "Crop before resizing for the sharpest final result, since cropping doesn't reduce resolution within the selected area.",
      "Leave a little breathing room around a subject's face for profile-picture crops rather than cropping too tightly.",
      "Watch the live dimensions while dragging to hit a common ratio like 1:1 or 16:9 precisely.",
      "For document photos with strict size requirements, crop first, then use a dedicated resizer to hit the exact pixel target.",
    ],
    faqs: [
      { q: "Does cropping reduce image resolution?", a: "Cropping only removes pixels outside your selection; the remaining area keeps its original resolution." },
      { q: "Can I crop to an exact aspect ratio like 1:1 or 16:9?", a: "Yes, drag the crop box to the proportions you need, watching the live dimensions as you adjust." },
      { q: "Is the original photo modified?", a: "No, the crop is applied to a copy and downloaded separately; your original file is untouched." },
      { q: "Can I undo and redo the crop selection?", a: "Yes, you can freely readjust the crop box as many times as you like before downloading." },
    ],
    relatedTools: [
      { name: "Image Resizer", slug: "resizer" },
      { name: "Image Rotate & Flip", slug: "image-rotate" },
      { name: "Image Compressor", slug: "compressor" },
      { name: "YouTube Thumbnail Converter", slug: "youtube-thumbnail-converter" },
    ],
  },

  "image-rotate": {
    overview: [
      "A photo taken with a phone held sideways, or a document fed into a scanner the wrong way, often ends up rotated incorrectly once it's uploaded somewhere else. This is a surprisingly common annoyance, especially with scanned paperwork where the physical page orientation doesn't match how the scanner captured it.",
      "This tool rotates images in 90-degree increments and can also flip them horizontally or vertically, correcting orientation problems in a couple of clicks rather than reopening a full photo editor for what should be a simple fix.",
      "Rotation and flipping are handled by redrawing the image onto a repositioned canvas, so the operation is lossless in terms of pixel data — only the orientation changes, not the underlying image quality.",
    ],
    steps: [
      { title: "Upload the image", description: "Select or drag the photo or scan you need to fix." },
      { title: "Choose rotate or flip", description: "Use the rotate buttons for 90-degree turns, or flip for a mirror effect." },
      { title: "Preview the result", description: "Confirm the orientation looks correct before downloading." },
      { title: "Download the corrected image", description: "Save the properly oriented file to your device." },
    ],
    useCases: [
      { title: "Fixing sideways phone photos", description: "Correct orientation issues that happen when a photo is taken with the phone rotated." },
      { title: "Scanned document correction", description: "Rotate a page scanned upside-down or sideways before sharing or archiving it." },
      { title: "Mirrored image correction", description: "Flip a photo that appears reversed, such as one taken with a front-facing camera." },
      { title: "Preparing consistent image sets", description: "Standardize orientation across a batch of photos before combining them into a document." },
    ],
    tips: [
      "If a photo displays correctly in one app but sideways in another, the issue is usually EXIF orientation metadata — rotating and re-saving here bakes the correct orientation into the pixels.",
      "Flip horizontally to correct a mirrored selfie rather than rotating, since rotation won't fix a mirror effect.",
      "Rotate before cropping so your crop selection lines up with the corrected orientation.",
      "Always preview at full size before downloading to make sure the orientation change looks right.",
    ],
    faqs: [
      { q: "What's the difference between rotate and flip?", a: "Rotating turns the whole image around a center point like a clock hand, while flipping mirrors the image horizontally or vertically without changing its angle." },
      { q: "Will this fix a photo that looks rotated only in some apps?", a: "That's usually caused by EXIF orientation metadata being read differently by different apps; rotating and re-saving here fixes the inconsistency everywhere." },
      { q: "Does rotating reduce image quality?", a: "No, rotation in 90-degree steps simply repositions pixels without any quality loss." },
      { q: "Can I rotate by a custom angle, like 15 degrees?", a: "This tool focuses on quick 90-degree rotations and flips; for arbitrary angle rotation, a dedicated photo editor would be needed." },
    ],
    relatedTools: [
      { name: "Image Cropper", slug: "image-cropper" },
      { name: "Image Resizer", slug: "resizer" },
      { name: "Image Compressor", slug: "compressor" },
      { name: "PDF to Image", slug: "pdf-to-image" },
    ],
  },

  "image-watermark": {
    overview: [
      "Photographers, designers, and small businesses often add a visible watermark before sharing preview images online — a name, logo, or website URL layered over the photo to discourage unauthorized reuse and reinforce branding at the same time. Doing this by hand in a full design tool is overkill for a quick, repeated task.",
      "This tool lets you position text or an uploaded logo image anywhere on the photo, adjust its opacity and size, and generate the watermarked result without touching the original file. The live preview shows exactly how the final image will look before you commit to downloading it.",
      "Because the watermark is composited directly onto a canvas in your browser, there's no upload step and no dependency on an external watermarking service holding a copy of your photo.",
    ],
    steps: [
      { title: "Upload your photo", description: "Select or drag the image you want to protect." },
      { title: "Choose text or logo watermark", description: "Type a name or URL, or upload a logo image to overlay." },
      { title: "Position and adjust opacity", description: "Drag the watermark to place it, then fine-tune transparency and size." },
      { title: "Download the watermarked photo", description: "Save the final image with the watermark permanently applied." },
    ],
    useCases: [
      { title: "Protecting portfolio previews", description: "Photographers and designers watermark preview images shared publicly before a client purchases the full-resolution file." },
      { title: "Brand reinforcement", description: "Add a logo or website URL to images shared on social media so viewers know where they came from." },
      { title: "Discouraging unauthorized reuse", description: "A visible watermark makes it obvious when someone has copied an image without permission." },
      { title: "Marking draft or sample content", description: "Overlay 'Draft' or 'Sample' text on work-in-progress images shared for feedback." },
    ],
    tips: [
      "Around 40-60% opacity is a common balance — visible enough to deter copying, subtle enough not to distract from the photo.",
      "Position the watermark somewhere that's hard to crop out, like across a central area, if protection is the main goal.",
      "For branding rather than protection, a smaller corner watermark looks cleaner.",
      "Use a transparent PNG logo for the cleanest overlay results rather than a logo with a solid background.",
    ],
    faqs: [
      { q: "Does the watermark permanently change my original photo?", a: "No — the watermark is applied to a copy and downloaded separately; your original uploaded file is never modified or stored anywhere." },
      { q: "How opaque should a watermark be?", a: "Around 40-60% opacity is a common balance between visibility and not distracting from the photo itself." },
      { q: "Can I use my own logo instead of text?", a: "Yes, upload a logo image and position it the same way as a text watermark." },
      { q: "Can someone remove the watermark easily?", a: "A watermark discourages casual reuse but isn't cryptographically tamper-proof; placing it across a central area of the image makes removal harder." },
    ],
    relatedTools: [
      { name: "Image Compressor", slug: "compressor" },
      { name: "Image Resizer", slug: "resizer" },
      { name: "Image Cropper", slug: "image-cropper" },
      { name: "Color Picker", slug: "color-picker" },
    ],
  },

  "pdf-to-image": {
    overview: [
      "PDFs are designed to look the same everywhere, but that consistency comes at a cost: you can't drag a PDF page into a photo editor, paste it directly into a slide deck, or attach a single page to a social post without first converting it to an image.",
      "This tool renders every page of an uploaded PDF as a separate high-resolution PNG image, preserving the original page layout exactly as it appears. Whether the PDF contains text, scanned pages, or a mix of both, the visual output is captured page by page.",
      "Rendering happens using a PDF parsing library running inside your browser, so the document never needs to be uploaded to a conversion server — the pages are drawn directly onto a canvas and exported locally.",
    ],
    steps: [
      { title: "Upload your PDF", description: "Select or drag the PDF file you want to convert." },
      { title: "Wait for pages to render", description: "Each page is processed and displayed as a thumbnail preview." },
      { title: "Select the pages you need", description: "Choose one, several, or all pages to export." },
      { title: "Download as PNG", description: "Save the selected pages as individual high-quality image files." },
    ],
    useCases: [
      { title: "Adding a PDF page to a presentation", description: "Convert a specific page to an image so it can be embedded directly into a slide." },
      { title: "Sharing a page on social media", description: "Extract a single page as an image for platforms that don't support PDF attachments." },
      { title: "Editing content from a PDF", description: "Bring a page into a photo editor for annotation or further editing." },
      { title: "Archiving scanned documents visually", description: "Convert scanned PDF pages into images for use in photo-based archiving systems." },
    ],
    tips: [
      "Higher-resolution PDFs produce sharper output images, so avoid converting a heavily compressed source PDF if quality matters.",
      "For multi-page PDFs, convert only the pages you actually need to keep the process quick.",
      "Scanned PDFs convert the same way as text-based ones, since the tool renders the visual page rather than extracting text.",
      "Check the output resolution against your intended use before relying on it for print.",
    ],
    faqs: [
      { q: "Will each PDF page become one image?", a: "Yes, every page in the PDF is rendered as its own separate PNG image, matching the page's original layout." },
      { q: "Does this work with scanned PDFs?", a: "Yes — since the tool renders the visual page rather than extracting text, scanned documents convert the same way as text-based PDFs." },
      { q: "What image format is used for the output?", a: "Pages are exported as PNG, which preserves sharp text and graphics without lossy compression artifacts." },
      { q: "Is there a limit to how many pages I can convert?", a: "There's no fixed limit, though very long documents take longer to render since processing happens entirely in your browser." },
    ],
    relatedTools: [
      { name: "Image to PDF", slug: "image-to-pdf" },
      { name: "PDF Merge", slug: "pdf-merge" },
      { name: "PDF Split", slug: "pdf-split" },
      { name: "Image Compressor", slug: "compressor" },
    ],
  },

  "svg-to-png": {
    overview: [
      "SVG is a vector format that scales to any size without losing sharpness, which is exactly why it's the standard for icons, logos, and illustrations on the modern web. But that same flexibility becomes a limitation the moment you need to paste an SVG into a tool that only accepts raster images — most presentation software, many older platforms, and plenty of upload forms only understand pixel-based formats like PNG.",
      "This converter renders your SVG at a fixed pixel size and exports it as a PNG, preserving any transparency in the original so the result still drops cleanly onto any background, just like the source vector did.",
      "Because SVG is itself just structured markup, rendering it happens instantly in the browser by drawing it onto a canvas at your chosen resolution — no external rendering service is involved.",
    ],
    steps: [
      { title: "Upload your SVG file", description: "Select or drag the .svg file into the tool." },
      { title: "Set the output size", description: "Choose the pixel dimensions you want the PNG rendered at." },
      { title: "Preview the rendered image", description: "Confirm the SVG has rendered correctly at the chosen size." },
      { title: "Download the PNG", description: "Save the rasterized image for use anywhere PNG is required." },
    ],
    useCases: [
      { title: "Presentation software compatibility", description: "Many slide tools handle PNG far more reliably than embedded SVG markup." },
      { title: "Social media and platform uploads", description: "Convert a vector logo to PNG for platforms that only accept raster image uploads." },
      { title: "Email signature images", description: "Email clients often render PNG logos more consistently than inline SVG." },
      { title: "Preparing app store or listing assets", description: "Many submission portals require a specific raster format rather than vector graphics." },
    ],
    tips: [
      "Export at a larger pixel size than you think you need — a PNG can always be downsized later without quality loss, but not enlarged cleanly.",
      "Check the exported PNG's edges at full zoom; complex SVGs with fine detail benefit from a higher export resolution.",
      "Keep the original SVG file for any future edits, since PNG can no longer be resized without quality loss.",
      "Use a transparent background in your SVG if you want the PNG to overlay cleanly on other content.",
    ],
    faqs: [
      { q: "Will the PNG look blurry compared to the SVG?", a: "Unlike SVG, PNG is resolution-fixed, so exporting at a larger pixel size keeps edges sharp; exporting small and enlarging later can look blurry." },
      { q: "Is transparency preserved?", a: "Yes, any transparent areas in the SVG remain transparent in the exported PNG." },
      { q: "Can I choose the exact output resolution?", a: "Yes, set the width and height you want before rendering and downloading the PNG." },
      { q: "Does this work with complex, multi-layer SVGs?", a: "Yes, the browser's native SVG rendering engine handles most standard SVG features, including gradients, paths, and groups." },
    ],
    relatedTools: [
      { name: "WebP Converter", slug: "webp-converter" },
      { name: "Image Compressor", slug: "compressor" },
      { name: "Color Picker", slug: "color-picker" },
      { name: "JPG to PNG", slug: "jpg-to-png" },
    ],
  },

  "color-picker": {
    overview: [
      "Matching a color exactly from a reference image is a common but oddly fiddly task. Eyeballing a hex code from a screenshot rarely lands on the exact value, and small mismatches are easy to spot once a logo or brand color is placed next to the original.",
      "This tool samples the precise pixel value under your cursor as you hover over an uploaded image, and outputs it simultaneously in HEX, RGB, and HSL — the three formats most commonly needed across CSS, design software, and print workflows.",
      "Because the sampling reads directly from the image data loaded into the browser, the color returned is exact — not an approximation — down to the individual pixel you click.",
    ],
    steps: [
      { title: "Upload your reference image", description: "Select or drag the photo, screenshot, or logo you want to sample from." },
      { title: "Hover to preview colors", description: "Move your cursor over the image to see live color values update." },
      { title: "Click to lock in a color", description: "Selecting a pixel adds it to your picked colors list." },
      { title: "Copy the value you need", description: "Copy HEX, RGB, or HSL depending on where you're using the color." },
    ],
    useCases: [
      { title: "Matching brand colors", description: "Extract an exact color from a logo or brand asset to use consistently across a website or document." },
      { title: "Design handoff", description: "Pull precise colors from a mockup screenshot when the original design file isn't available." },
      { title: "Recreating a color scheme", description: "Sample multiple colors from a reference photo to build a matching palette." },
      { title: "Accessibility checks", description: "Identify exact color values to check contrast ratios against text or background colors." },
    ],
    tips: [
      "Zoom into the image first if you need to sample a very small or detailed area precisely.",
      "HEX is most common for CSS and design tools; HSL is easier when you need to programmatically adjust lightness or saturation.",
      "Sample multiple points from a gradient to capture its full range of colors.",
      "Double-check picked colors on the actual target screen, since display calibration can shift how a color appears.",
    ],
    faqs: [
      { q: "Why does the same color look slightly different on another screen?", a: "Monitor calibration varies between devices, so the HEX/RGB values are accurate to the image file, but visual appearance can shift depending on the display." },
      { q: "Which format should I use for CSS?", a: "HEX (e.g. #3B82F6) is the most common in CSS and design tools, while HSL is often easier when adjusting lightness or saturation programmatically." },
      { q: "Does this tool upload my image?", a: "No, sampling happens entirely in your browser by reading the pixel data of the loaded image." },
      { q: "Can I pick multiple colors from one image?", a: "Yes, click as many points as you need — each picked color is added to a list you can copy from." },
    ],
    relatedTools: [
      { name: "Image Watermark", slug: "image-watermark" },
      { name: "SVG to PNG", slug: "svg-to-png" },
      { name: "Image Compressor", slug: "compressor" },
      { name: "JSON Formatter", slug: "json-formatter" },
    ],
  },

  "youtube-thumbnail-converter": {
    overview: [
      "YouTube recommends thumbnails at 1280×720 pixels with a 16:9 aspect ratio and a minimum width of 640 pixels. Upload an image with a different ratio, and YouTube crops it automatically — often cutting off a face, a key graphic element, or text that was meant to be visible in the thumbnail preview.",
      "This tool crops and resizes any photo or graphic to the exact 16:9 frame YouTube expects, so the preview you see while editing matches exactly what viewers will see in search results and suggested video lists.",
      "Getting this right matters more than it might seem: thumbnails are one of the biggest factors in whether a video gets clicked, and a poorly cropped thumbnail can undercut an otherwise strong piece of content before a viewer even presses play.",
    ],
    steps: [
      { title: "Upload your source image", description: "Select or drag the photo or graphic you plan to use as a thumbnail." },
      { title: "Position the 16:9 crop frame", description: "Drag to select exactly what should be visible in the final thumbnail." },
      { title: "Preview at YouTube's size", description: "Check how the crop looks at the actual 1280×720 dimensions." },
      { title: "Download the thumbnail", description: "Save the correctly sized image ready to upload to YouTube Studio." },
    ],
    useCases: [
      { title: "Fixing automatic YouTube crops", description: "Pre-crop an image so YouTube's own cropping never removes an important part of the frame." },
      { title: "Repurposing a photo as a thumbnail", description: "Turn a standard photo, which is rarely already 16:9, into a properly framed thumbnail." },
      { title: "Consistent channel branding", description: "Keep every thumbnail on a channel at the same aspect ratio for a cohesive look in the video grid." },
      { title: "Testing thumbnail variants", description: "Quickly produce a few differently cropped versions of the same source image to compare." },
    ],
    tips: [
      "Keep key visual elements — faces, text, main subject — away from the very edges, since thumbnails also get cropped slightly in some placements.",
      "Aim for high contrast and a clear focal point; thumbnails are often viewed at a small size in search results.",
      "Stay under YouTube's 2MB thumbnail file size limit; compress the image afterward if needed.",
      "Preview the thumbnail at a small size, not just full screen, since that's how most viewers will actually see it.",
    ],
    faqs: [
      { q: "What's the maximum file size YouTube allows for thumbnails?", a: "YouTube's official limit is 2MB per thumbnail image, in JPG, GIF, or PNG format." },
      { q: "Can I add text after resizing?", a: "This tool focuses on getting the crop and ratio correct; for adding bold thumbnail text or overlays, use a design tool after downloading the resized image." },
      { q: "Why does YouTube reject my current thumbnail?", a: "Custom thumbnails require a verified YouTube account and must meet the format and size requirements — a correctly sized JPG or PNG under 2MB." },
      { q: "Is 1280×720 the only size that works?", a: "It's YouTube's recommended size; images with the correct 16:9 ratio at other resolutions above the 640px minimum width also work." },
    ],
    relatedTools: [
      { name: "Image Cropper", slug: "image-cropper" },
      { name: "Image Resizer", slug: "resizer" },
      { name: "Image Compressor", slug: "compressor" },
      { name: "Image Watermark", slug: "image-watermark" },
    ],
  },

  base64: {
    overview: [
      "Base64 converts binary or text data into a set of 64 printable characters — A-Z, a-z, 0-9, plus, and slash — which is why it shows up so often in places that only reliably handle plain text: embedding small images directly inside CSS or HTML, passing data safely through URLs and JSON payloads, or attaching files within email systems built around text transport.",
      "It's important to be clear about what Base64 is not: it is an encoding, not encryption. There is no secret key involved, and anyone with the encoded string can decode it back to the original data instantly. It should never be used as a way to hide or protect sensitive information.",
      "This tool encodes plain text into Base64 or decodes a Base64 string back into readable text, all processed locally in your browser using native JavaScript functions, with the result available to copy immediately.",
    ],
    steps: [
      { title: "Choose encode or decode mode", description: "Select whether you're converting text to Base64 or Base64 back to text." },
      { title: "Paste your input", description: "Enter the text or the Base64 string you want to convert." },
      { title: "Review the output", description: "The converted result appears instantly as you type or paste." },
      { title: "Copy the result", description: "Click copy to grab the output for use elsewhere." },
    ],
    useCases: [
      { title: "Embedding small images in CSS", description: "Convert a small icon to Base64 to inline it directly in a stylesheet, avoiding an extra HTTP request." },
      { title: "Debugging API payloads", description: "Decode a Base64-encoded field in a JSON response to inspect its actual content." },
      { title: "Email attachment encoding", description: "Understand how binary attachments get represented as text within email protocols." },
      { title: "Passing data through URLs", description: "Encode data safely so it survives being passed as a URL parameter without special characters breaking it." },
    ],
    tips: [
      "Never use Base64 alone to protect sensitive data — it's reversible by anyone, with no password required.",
      "Expect encoded output to be about 33% longer than the original input; this is a normal property of the encoding, not an error.",
      "If decoding fails, double-check you copied the full Base64 string without accidental line breaks or missing characters.",
      "For binary files like images, dedicated file-to-Base64 tools handle the conversion more directly than plain text encoding.",
    ],
    faqs: [
      { q: "Is Base64 the same as encryption?", a: "No — Base64 is an encoding scheme, not encryption. It has no secret key, and anyone can decode it instantly." },
      { q: "Why is the encoded text longer than the original?", a: "Base64 encoding increases size by roughly 33%, since every 3 bytes of original data becomes 4 characters of encoded output." },
      { q: "Can I encode special characters and emoji?", a: "Yes, this tool handles Unicode text correctly during both encoding and decoding." },
      { q: "Is anything I type sent to a server?", a: "No, encoding and decoding both happen locally in your browser using built-in JavaScript functions." },
    ],
    relatedTools: [
      { name: "JSON Formatter", slug: "json-formatter" },
      { name: "URL Encoder / Decoder", slug: "url-encoder" },
      { name: "Character Counter", slug: "character-counter" },
      { name: "Password Generator", slug: "password-generator" },
    ],
  },

  "case-converter": {
    overview: [
      "Switching between uppercase, lowercase, and title case comes up more often than most people expect — reformatting a pasted headline for a slide deck, converting a spaced-out phrase into camelCase for a code variable name, or fixing text that was accidentally typed with caps lock left on for a whole paragraph.",
      "Rather than manually retyping or selectively re-capitalizing each word, this tool applies a consistent case transformation to any pasted text instantly, covering the common formats used across writing, design, and programming contexts.",
      "All of the transformation logic runs as simple string operations in JavaScript, directly in your browser, so long documents convert just as quickly as a single short phrase.",
    ],
    steps: [
      { title: "Paste your text", description: "Enter or paste the text you want to convert." },
      { title: "Choose a case format", description: "Select UPPERCASE, lowercase, Title Case, Sentence case, or camelCase." },
      { title: "Review the converted text", description: "The output updates instantly in the result box." },
      { title: "Copy the result", description: "Click copy to use the converted text wherever you need it." },
    ],
    useCases: [
      { title: "Fixing accidental caps lock text", description: "Convert a message typed entirely in uppercase back to normal sentence case." },
      { title: "Formatting headlines", description: "Apply Title Case consistently across article or slide headings." },
      { title: "Preparing code variable names", description: "Convert a phrase into camelCase for use as a JavaScript variable or function name." },
      { title: "Standardizing pasted content", description: "Normalize case across text pulled from different sources with inconsistent formatting." },
    ],
    tips: [
      "Title Case capitalizes most words for headline-style formatting, while Sentence case only capitalizes the first word and proper nouns.",
      "For code, camelCase is standard for JavaScript variables, while snake_case is more common in Python — check your language's convention.",
      "Run through the text once converted, since automated title casing can occasionally capitalize small connector words unexpectedly.",
      "This works best with standard Latin-alphabet text; languages without an uppercase/lowercase distinction aren't affected by case conversion.",
    ],
    faqs: [
      { q: "What's the difference between Title Case and Sentence case?", a: "Title Case capitalizes the first letter of most words, common in headlines, while Sentence case only capitalizes the first word and proper nouns." },
      { q: "Does this work with non-English text?", a: "Basic case conversion works with Latin-alphabet text; languages using different scripts don't have an uppercase/lowercase distinction, so case conversion won't apply." },
      { q: "Can I convert text into camelCase for code?", a: "Yes, camelCase conversion removes spaces and capitalizes each word after the first, matching common JavaScript variable naming conventions." },
      { q: "Is my text stored anywhere?", a: "No, all conversion happens locally in your browser and nothing is saved or transmitted." },
    ],
    relatedTools: [
      { name: "Character Counter", slug: "character-counter" },
      { name: "Word Counter", slug: "word-counter" },
      { name: "Slug Generator", slug: "slug-generator" },
      { name: "Text Repeater", slug: "text-repeater" },
    ],
  },

  "character-counter": {
    overview: [
      "Character limits are everywhere in digital writing, and they're rarely generous. Twitter/X posts cap out at 280 characters, Google typically truncates meta descriptions somewhere around 155-160 characters, and SMS messages split into multiple parts once they cross 160 characters — each with real consequences if you write past the limit without realizing it.",
      "This counter updates live as you type or paste text, tracking character count, word count, and paragraph count simultaneously, so you always know exactly where you stand relative to whatever limit you're writing toward.",
      "Because counting happens with every keystroke directly in the browser, there's no lag or need to click a separate 'count' button — the numbers are always current.",
    ],
    steps: [
      { title: "Paste or type your text", description: "Enter the content you want to measure." },
      { title: "Watch the live counts update", description: "Character, word, and paragraph counts refresh as you type." },
      { title: "Trim if you're over a limit", description: "Edit down until the character count fits your target platform." },
      { title: "Copy the final text", description: "Copy the trimmed content once it fits within your limit." },
    ],
    useCases: [
      { title: "Writing within social media limits", description: "Confirm a post fits Twitter/X's 280-character cap before publishing." },
      { title: "SEO meta descriptions", description: "Keep meta descriptions within Google's typical 150-160 character display limit." },
      { title: "SMS and notification text", description: "Avoid message splitting by staying under the 160-character SMS threshold." },
      { title: "Form field validation", description: "Check content length against a form's stated character limit before submitting." },
    ],
    tips: [
      "Spaces count as characters, matching how most platforms measure length.",
      "Aim for roughly 150-160 characters for meta descriptions to reduce the chance of truncation in search results.",
      "Watch paragraph count too, not just characters, when writing for readability-sensitive platforms.",
      "Paste text from other sources to catch hidden extra whitespace that can push you over a limit unexpectedly.",
    ],
    faqs: [
      { q: "Do spaces count as characters?", a: "Yes, spaces are included in the total character count, matching how most platforms count length." },
      { q: "What's a safe meta description length for SEO?", a: "Aiming for roughly 150-160 characters keeps most meta descriptions from being truncated in Google search results." },
      { q: "Does this tool save or store what I type?", a: "No, all counting happens locally in your browser as you type." },
      { q: "Can I count characters in a language other than English?", a: "Yes, the counter works with any Unicode text, including non-Latin scripts." },
    ],
    relatedTools: [
      { name: "Word Counter", slug: "word-counter" },
      { name: "Case Converter", slug: "case-converter" },
      { name: "Slug Generator", slug: "slug-generator" },
      { name: "Text Repeater", slug: "text-repeater" },
    ],
  },

  "json-formatter": {
    overview: [
      "APIs and browser developer tools frequently return JSON as one continuous unformatted line — efficient for network transfer, but nearly unreadable to a human trying to debug it. Finding a missing comma or a misplaced bracket in a wall of unindented text can turn a two-minute check into a frustrating manual scan.",
      "This formatter re-indents JSON with proper nesting and line breaks, instantly making the structure visible, and flags syntax errors — like a trailing comma, an unescaped quote, or an unclosed bracket — with a clear error message rather than a silent failure.",
      "Formatting and validation both run using the browser's built-in JSON parser, so there's no round-trip delay and no concern about a large or sensitive payload being sent anywhere outside your own machine.",
    ],
    steps: [
      { title: "Paste your JSON", description: "Enter the raw, possibly minified JSON text into the input box." },
      { title: "Click Format", description: "The tool re-indents the structure with proper nesting." },
      { title: "Check for errors", description: "If the JSON is invalid, an error message points to the likely problem." },
      { title: "Copy the formatted result", description: "Copy the readable, indented JSON for use elsewhere." },
    ],
    useCases: [
      { title: "Debugging API responses", description: "Format a minified API response to quickly locate a specific field or spot a missing value." },
      { title: "Reviewing configuration files", description: "Make a compact JSON config file readable before editing it manually." },
      { title: "Validating hand-written JSON", description: "Catch syntax errors before pasting JSON into code or a request body." },
      { title: "Teaching or documentation", description: "Present JSON examples in a clean, indented format that's easy to follow." },
    ],
    tips: [
      "Valid JSON requires double-quoted keys and string values — single quotes will cause a parse error.",
      "Trailing commas after the last item in an object or array are a common cause of 'invalid JSON' errors.",
      "Use the formatted, indented view while debugging, then minify again before sending over the network if size matters.",
      "Copy error messages carefully — they usually point to the character position where parsing failed.",
    ],
    faqs: [
      { q: "Why does it say my JSON is invalid?", a: "Common causes are trailing commas, single quotes instead of double quotes, or unescaped characters inside a string." },
      { q: "Is my JSON data sent anywhere?", a: "No, formatting and validation happen entirely in your browser using JavaScript." },
      { q: "Can I minify JSON as well as format it?", a: "This tool focuses on pretty-printing for readability; minifying removes the whitespace this tool adds." },
      { q: "Does it work with very large JSON files?", a: "Yes, though extremely large payloads may take a moment longer to parse and render, since everything runs client-side." },
    ],
    relatedTools: [
      { name: "Base64 Encoder / Decoder", slug: "base64" },
      { name: "URL Encoder / Decoder", slug: "url-encoder" },
      { name: "Character Counter", slug: "character-counter" },
      { name: "Slug Generator", slug: "slug-generator" },
    ],
  },

  "password-generator": {
    overview: [
      "Password strength comes overwhelmingly from length and randomness, not from satisfying arbitrary complexity rules. A 16-character password mixing letters, numbers, and symbols is dramatically harder to crack than an 8-character password with one forced special character — even though the shorter one technically checks more boxes on a typical signup form.",
      "This generator produces passwords using your browser's cryptographic random number source, avoiding the predictable patterns — substituting '3' for 'e', appending '123' — that humans tend to fall into when creating passwords manually, patterns that automated cracking tools are specifically built to try first.",
      "You can adjust length and which character types to include, letting you match a specific site's requirements while keeping the underlying randomness intact.",
    ],
    steps: [
      { title: "Set your desired length", description: "Longer passwords are stronger; 16+ characters is a reasonable default." },
      { title: "Choose character types", description: "Toggle uppercase, lowercase, numbers, and symbols on or off as needed." },
      { title: "Generate a password", description: "Click generate to produce a new random password instantly." },
      { title: "Copy and store it securely", description: "Copy the password directly into a password manager rather than a plain text note." },
    ],
    useCases: [
      { title: "Creating new account passwords", description: "Generate a strong, unique password for every new signup instead of reusing an old one." },
      { title: "Rotating compromised credentials", description: "Quickly generate a fresh password after a service reports a data breach." },
      { title: "Shared team accounts", description: "Create a strong password for shared logins that need to be distributed securely." },
      { title: "Wi-Fi and device passwords", description: "Generate a strong passphrase for router admin panels or device setup." },
    ],
    tips: [
      "Aim for at least 12-16 characters for anything important; length matters more than symbol variety alone.",
      "Never reuse the same strong password across multiple sites — one breach then exposes every account using it.",
      "Store generated passwords in a password manager rather than memorizing or writing them down.",
      "Include all character types (upper, lower, number, symbol) unless a specific site restricts certain characters.",
    ],
    faqs: [
      { q: "Is it safe to generate passwords in a browser?", a: "Yes — generation happens locally using your browser's cryptographic random functions, and the password is never transmitted anywhere." },
      { q: "Should I reuse the same strong password everywhere?", a: "No — even a strong password becomes risky if reused, since one leaked site can expose every account using that password." },
      { q: "How long should my password be?", a: "Most security guidance now recommends at least 12-16 characters for important accounts, combined with a password manager." },
      { q: "Why avoid predictable substitutions like '@' for 'a'?", a: "Password-cracking tools are specifically trained on these common substitutions, so they add far less real security than most people assume." },
    ],
    relatedTools: [
      { name: "Base64 Encoder / Decoder", slug: "base64" },
      { name: "Signature Resizer", slug: "signature-resizer" },
      { name: "Character Counter", slug: "character-counter" },
      { name: "URL Encoder / Decoder", slug: "url-encoder" },
    ],
  },

  "slug-generator": {
    overview: [
      "A blog post titled '10 Best Places to Visit in 2026!' turns into a messy, unreliable URL if pasted directly into an address bar — spaces need encoding, punctuation causes ambiguity, and capital letters create inconsistency across servers that treat URLs case-sensitively. A clean slug like 10-best-places-to-visit-2026 avoids all of that.",
      "This tool converts any title or phrase into a lowercase, hyphen-separated slug automatically, stripping special characters, collapsing multiple spaces, and removing accents — the exact format search engines and content management systems expect for readable, reliable URLs.",
      "Beyond technical reliability, a clean slug also affects how a URL looks in search results and when shared — a tidy, descriptive slug signals relevance and trustworthiness in a way that a URL full of encoded characters or random IDs doesn't.",
    ],
    steps: [
      { title: "Paste your title or phrase", description: "Enter the text you want converted into a URL-friendly slug." },
      { title: "Review the generated slug", description: "The tool converts it to lowercase, hyphenated format automatically." },
      { title: "Edit if needed", description: "Manually trim or adjust the slug for length or clarity." },
      { title: "Copy the final slug", description: "Copy the result for use in your CMS or URL structure." },
    ],
    useCases: [
      { title: "Blog post URLs", description: "Convert an article title into a clean, SEO-friendly URL slug." },
      { title: "Product page URLs", description: "Generate consistent, readable slugs for e-commerce product listings." },
      { title: "File and folder naming", description: "Create consistent, special-character-free names for uploaded files or folders." },
      { title: "Anchor links within a page", description: "Generate valid anchor IDs from section headings for in-page navigation." },
    ],
    tips: [
      "Hyphens are generally preferred over underscores, since Google treats hyphens as word separators.",
      "Shorter, descriptive slugs (roughly 3-6 words) tend to be easier to read and share than ones mirroring an entire long title.",
      "Avoid stuffing keywords unnaturally into a slug just for SEO — a natural, readable phrase performs just as well.",
      "Keep slugs stable once published; changing a URL later can break existing links and lose accumulated search ranking.",
    ],
    faqs: [
      { q: "Should I use hyphens or underscores in a slug?", a: "Hyphens are generally recommended, since Google treats hyphens as word separators but can read underscore-joined words as a single term." },
      { q: "How long should a slug be?", a: "Shorter, descriptive slugs (roughly 3-6 words) tend to be easier to read and share than long ones mirroring the full title." },
      { q: "Does this remove accented characters?", a: "Yes, accented characters are converted to their closest plain-letter equivalent to keep the slug URL-safe." },
      { q: "Can I include numbers in a slug?", a: "Yes, numbers are preserved as-is, which is useful for dates or list-style titles like '10-best-places'." },
    ],
    relatedTools: [
      { name: "Case Converter", slug: "case-converter" },
      { name: "URL Encoder / Decoder", slug: "url-encoder" },
      { name: "Word Counter", slug: "word-counter" },
      { name: "Character Counter", slug: "character-counter" },
    ],
  },

  "text-repeater": {
    overview: [
      "Repeating a line or phrase by hand becomes tedious and error-prone past a handful of copies. It's a small task that comes up in surprisingly practical contexts: generating placeholder or test data for a form, creating repeated content to test a spam filter, filling table rows during development, or simply producing a decorative repeated pattern of characters.",
      "This tool takes any text you type once and repeats it as many times as you specify, with an optional separator between each copy — a line break, comma, or custom character — so the output is ready to paste directly wherever it's needed.",
      "Because repetition is simple string manipulation, even large repeat counts generate near-instantly in the browser, with the full result available to copy in one click.",
    ],
    steps: [
      { title: "Type or paste your text", description: "Enter the phrase or line you want repeated." },
      { title: "Set the repeat count", description: "Choose how many times the text should be repeated." },
      { title: "Choose a separator", description: "Select a line break, comma, space, or custom character between repeats." },
      { title: "Copy the result", description: "Copy the full repeated block for use elsewhere." },
    ],
    useCases: [
      { title: "Generating test data", description: "Quickly produce placeholder rows of repeated text for testing a form or table layout." },
      { title: "Creating spam-filter test content", description: "Generate repetitive text patterns to test how a filter or moderation system reacts." },
      { title: "Filling development mockups", description: "Populate a UI mockup with repeated placeholder content before real data is available." },
      { title: "Simple decorative patterns", description: "Repeat a character or symbol to build a quick text-based divider or pattern." },
    ],
    tips: [
      "Very large repeat counts (tens of thousands) may slow down your browser tab since everything is processed client-side.",
      "Use a line break separator when the output needs to be pasted as multiple separate rows.",
      "A comma separator works well when generating a list-style value for code or spreadsheets.",
      "Preview the output before copying a very long repeated block to make sure the separator is exactly what you expect.",
    ],
    faqs: [
      { q: "Is there a limit to how many times I can repeat text?", a: "There's no hard-coded cap, but extremely large repeat counts may slow down your browser tab since it's all processed client-side." },
      { q: "Can I add a separator between repeats?", a: "Yes, use the separator option to insert a line break, comma, or custom character between each repeated copy." },
      { q: "Does this tool store what I type?", a: "No, repetition happens locally in your browser and nothing is saved or transmitted." },
      { q: "Can I repeat multi-line text, not just a single word?", a: "Yes, any text you paste — including multiple lines — is repeated as a whole block." },
    ],
    relatedTools: [
      { name: "Case Converter", slug: "case-converter" },
      { name: "Character Counter", slug: "character-counter" },
      { name: "Word Counter", slug: "word-counter" },
      { name: "Slug Generator", slug: "slug-generator" },
    ],
  },

  "url-encoder": {
    overview: [
      "URLs can only safely carry a limited set of characters. Spaces, ampersands, question marks, and non-English letters all need to be percent-encoded — like %20 representing a space — before they can be reliably passed as part of a query string or link. Skip this step, and a link can break, or an API silently drops part of the submitted data at the first special character it hits.",
      "This tool encodes plain text into its percent-encoded, URL-safe form, or decodes an already-encoded URL back into readable text, so you can inspect exactly what data a link is actually carrying.",
      "Both directions run using the browser's built-in encoding functions, so results are instant and match exactly how a real browser or server would interpret the same string.",
    ],
    steps: [
      { title: "Choose encode or decode", description: "Select whether you're encoding plain text or decoding an existing URL-encoded string." },
      { title: "Paste your input", description: "Enter the text or the encoded URL fragment." },
      { title: "Review the output", description: "The converted result updates instantly." },
      { title: "Copy the result", description: "Copy the encoded or decoded text for use elsewhere." },
    ],
    useCases: [
      { title: "Building query string parameters", description: "Encode a search term or user input safely before appending it to a URL." },
      { title: "Debugging broken links", description: "Decode a suspicious-looking URL to see exactly what data it's carrying." },
      { title: "API request construction", description: "Ensure values passed as URL parameters won't be misinterpreted by the server." },
      { title: "Sharing links with special characters", description: "Safely encode a URL that includes spaces or symbols before sharing it." },
    ],
    tips: [
      "Encode any value you insert into a query string or URL path that might contain spaces, symbols, or non-ASCII characters.",
      "%20 and + both represent a space, but in different encoding contexts — know which one your target system expects.",
      "Decode a suspicious link before clicking it if you want to verify its actual destination or parameters first.",
      "Double-encoding (encoding an already-encoded string) is a common mistake — check your input isn't already encoded first.",
    ],
    faqs: [
      { q: "When do I need to encode a URL?", a: "Encode any value inserted into a query string or URL path that might contain spaces, symbols, or non-ASCII characters." },
      { q: "Why does %20 sometimes appear as a plus sign (+)?", a: "Both represent a space, but in different encoding contexts — %20 is standard URL encoding, while + is used in form data encoding." },
      { q: "Is my text sent anywhere during encoding?", a: "No, both encoding and decoding happen locally in your browser using built-in JavaScript functions." },
      { q: "Can I encode an entire URL, not just a parameter?", a: "You can, though typically only the specific parameter values need encoding, not the base URL structure itself." },
    ],
    relatedTools: [
      { name: "Base64 Encoder / Decoder", slug: "base64" },
      { name: "Slug Generator", slug: "slug-generator" },
      { name: "JSON Formatter", slug: "json-formatter" },
      { name: "Character Counter", slug: "character-counter" },
    ],
  },

  "image-size-checker": {
    overview: [
      "Many upload forms — passport photo portals, job application systems, website content fields — reject a file outside a specific pixel size or file size range, and they often do it without a clear error message, leaving you guessing what actually went wrong.",
      "This tool reads an image's exact width, height, file size, and format the moment you upload it, so you can confirm whether it meets a requirement before submitting it anywhere, rather than finding out after a rejected upload.",
      "All of this information comes from the file's own metadata and pixel data, read locally in your browser — there's no need to upload the image to a separate service just to check its dimensions.",
    ],
    steps: [
      { title: "Upload the image", description: "Select or drag the file you want to check." },
      { title: "View the dimensions", description: "Exact width and height in pixels appear instantly." },
      { title: "Check the file size", description: "File size in KB or MB is shown alongside the format." },
      { title: "Compare against your requirement", description: "Confirm the numbers match whatever form or spec you're submitting to." },
    ],
    useCases: [
      { title: "Verifying document photo specs", description: "Confirm a photo matches a required pixel size before uploading it to a government or exam portal." },
      { title: "Checking website image assets", description: "Verify an image's actual dimensions and file size before adding it to a page." },
      { title: "Debugging upload rejections", description: "Diagnose exactly why a form rejected a file by checking its real specifications." },
      { title: "Quality control before delivery", description: "Confirm final exported assets meet a client's specified dimensions before sending them over." },
    ],
    tips: [
      "Check both pixel dimensions and file size — some forms restrict one, some restrict both, and some restrict neither exactly as you'd expect.",
      "If a file is too large, use a compressor or resizer first, then re-check here before re-uploading.",
      "File size and pixel dimensions are independent — two images with the same dimensions can have very different file sizes depending on compression.",
      "Screenshots taken on high-DPI displays are often larger in pixels than they appear on screen; always verify actual dimensions.",
    ],
    faqs: [
      { q: "Does this tool upload my image to check it?", a: "No, the dimensions and file details are read locally in your browser using the file's metadata." },
      { q: "What's the difference between file size and pixel dimensions?", a: "File size (KB/MB) is how much storage the file takes up, while pixel dimensions describe the image's resolution." },
      { q: "Can I check multiple images at once?", a: "This tool checks one image at a time to keep the results clear and immediate." },
      { q: "Does it show the image's color format too?", a: "Yes, the file format (JPG, PNG, etc.) is shown alongside the dimensions and size." },
    ],
    relatedTools: [
      { name: "Image Resizer", slug: "resizer" },
      { name: "Image Compressor", slug: "compressor" },
      { name: "Image Cropper", slug: "image-cropper" },
      { name: "Passport Size Photo Maker", slug: "passport-photo" },
    ],
  },

  "pdf-merge": {
    overview: [
      "Job applications and government submissions often ask for a single PDF containing several documents — a resume plus certificates, or multiple scanned ID pages — rather than separate attachments that reviewers have to open one by one. Combining files manually usually means installing PDF editing software just for a one-time task.",
      "This tool stacks your selected PDFs into a single combined document, letting you reorder the files before merging so the final pages appear in exactly the sequence you intend.",
      "Merging happens using a PDF manipulation library running entirely in your browser, so your documents — which are often sensitive, like IDs or contracts — are never uploaded to an external server during the process.",
    ],
    steps: [
      { title: "Add your PDF files", description: "Select or drag multiple PDF documents into the tool." },
      { title: "Reorder as needed", description: "Arrange the files in the sequence you want them to appear." },
      { title: "Remove any unwanted file", description: "Drop a file from the list before merging if you added it by mistake." },
      { title: "Merge and download", description: "Click merge, then download the single combined PDF." },
    ],
    useCases: [
      { title: "Job application packets", description: "Combine a resume, cover letter, and certificates into one PDF for a single upload." },
      { title: "Scanned document consolidation", description: "Merge several individually scanned pages into one complete document." },
      { title: "Contract and invoice bundling", description: "Combine related business documents into a single file for easier record-keeping." },
      { title: "Report compilation", description: "Merge separate PDF sections or chapters into one final report." },
    ],
    tips: [
      "Arrange files in the exact order you want before clicking merge, since reordering afterward requires starting over.",
      "Rename your source files with numbers first (01, 02, 03) if you want a quick way to keep track of intended order.",
      "Very large batches of high-resolution PDFs take longer to process since everything runs in your browser.",
      "Check the final merged PDF's page count matches your expectation before submitting it anywhere.",
    ],
    faqs: [
      { q: "Can I change the order of the PDFs before merging?", a: "Yes, arrange the files in the order you want before clicking merge — the final PDF follows that exact sequence." },
      { q: "Is there a limit on how many PDFs I can merge?", a: "There's no fixed limit, though merging many large PDFs at once may take longer since processing happens in your browser." },
      { q: "Are my PDF files uploaded anywhere during merging?", a: "No, merging happens entirely in your browser using a local PDF processing library." },
      { q: "Does merging affect the original files?", a: "No, your original PDF files remain unchanged; only the new combined file is generated." },
    ],
    relatedTools: [
      { name: "PDF Split", slug: "pdf-split" },
      { name: "Image to PDF", slug: "image-to-pdf" },
      { name: "PDF to Image", slug: "pdf-to-image" },
      { name: "Image Compressor", slug: "compressor" },
    ],
  },

  "pdf-split": {
    overview: [
      "Sometimes you only need page 3 of a 40-page report, or you want to separate a multi-page scanned document into individual files for different recipients. Extracting specific pages from a PDF usually means installing dedicated software for what is often a single, quick task.",
      "This tool displays every page of your PDF as a thumbnail so you can visually select exactly which pages to extract, then generates a new, smaller PDF containing only those pages — without needing to share or re-upload the entire original document elsewhere.",
      "Page extraction runs locally using a PDF processing library loaded into your browser, so the source document, which might contain sensitive information on pages you're not extracting, never leaves your device.",
    ],
    steps: [
      { title: "Upload your PDF", description: "Select or drag the document you want to split." },
      { title: "Review the page thumbnails", description: "Each page renders as a preview you can visually scan." },
      { title: "Select the pages you need", description: "Click to select one, several, or a range of pages." },
      { title: "Extract and download", description: "Generate and download a new PDF containing only the selected pages." },
    ],
    useCases: [
      { title: "Extracting a specific chapter or section", description: "Pull out just the relevant pages from a long report or textbook PDF." },
      { title: "Separating a multi-document scan", description: "Split a single scanned file containing several unrelated documents into individual PDFs." },
      { title: "Sharing partial content", description: "Send only the relevant pages of a longer document rather than the entire file." },
      { title: "Removing unnecessary pages", description: "Extract just the pages you need, leaving out cover sheets or blank pages." },
    ],
    tips: [
      "Use the thumbnail previews to visually confirm you're selecting the right pages before extracting.",
      "You can select non-consecutive pages — like 1, 3, and 7 — not just a continuous range.",
      "Double-check the extracted PDF's page order matches what you expected before sending it anywhere important.",
      "For very large PDFs, extracting just the pages you need first makes any further editing faster.",
    ],
    faqs: [
      { q: "Does splitting affect the original PDF?", a: "No, your original file stays unchanged; the extracted pages are downloaded as a separate new PDF." },
      { q: "Can I select non-consecutive pages?", a: "Yes, you can pick any combination of pages, like 1, 3, and 7, rather than only a continuous range." },
      { q: "Is my PDF uploaded to a server to split it?", a: "No, page rendering and extraction both happen locally in your browser." },
      { q: "Can I extract pages from a very large PDF?", a: "Yes, though rendering thumbnails for a very long document may take a little longer since it's processed entirely client-side." },
    ],
    relatedTools: [
      { name: "PDF Merge", slug: "pdf-merge" },
      { name: "PDF to Image", slug: "pdf-to-image" },
      { name: "Image to PDF", slug: "image-to-pdf" },
      { name: "Image Compressor", slug: "compressor" },
    ],
  },

  "word-counter": {
    overview: [
      "Word and character counts matter well beyond school essays. Meta descriptions, tweet drafts, resume bullet points, and press releases all have unofficial or hard length expectations, and it's easy to drift past them without noticing while writing.",
      "This tool tracks word count, character count, and paragraph count live as you type or paste text, so you can catch a paragraph that's run long or confirm a piece hits a required minimum before submitting it, without switching to a separate word processor just to check.",
      "Because counting is handled entirely with JavaScript running in your browser, the numbers update instantly with every keystroke rather than requiring a manual refresh or a round trip to a server.",
    ],
    steps: [
      { title: "Paste or type your text", description: "Enter the content you want to measure." },
      { title: "Watch the live counts", description: "Word, character, and paragraph counts update as you write." },
      { title: "Edit to hit your target", description: "Trim or expand content until it matches a required word count." },
      { title: "Copy the finished text", description: "Copy the content once it meets your length requirement." },
    ],
    useCases: [
      { title: "Meeting essay or assignment word counts", description: "Confirm a piece of writing meets a minimum or maximum word requirement before submission." },
      { title: "Writing concise social captions", description: "Keep captions within a comfortable reading length for social platforms." },
      { title: "Resume bullet point length", description: "Keep individual resume bullets tight and scannable rather than running long." },
      { title: "Press release and article drafts", description: "Track length against editorial guidelines while drafting." },
    ],
    tips: [
      "Words are counted as sequences of characters separated by spaces or line breaks, matching how most word processors count them.",
      "Watch paragraph count too — very long single paragraphs can hurt readability even within a word limit.",
      "Paste text from other sources to catch accidental extra whitespace that can throw off an exact count.",
      "Use the live count while drafting rather than checking only at the end, to avoid a large last-minute trim.",
    ],
    faqs: [
      { q: "How is a 'word' counted here?", a: "Words are counted as sequences of characters separated by spaces or line breaks, matching how most word processors count them." },
      { q: "Does this tool save or store what I type?", a: "No, all counting happens locally in your browser as you type — nothing is sent to a server or saved anywhere." },
      { q: "Does it count words in other languages?", a: "Yes, the counter works with any Unicode text, though word-splitting logic is optimized for space-separated languages like English." },
      { q: "Can I count just a portion of my text?", a: "Yes, paste or select only the portion you want measured into the input box." },
    ],
    relatedTools: [
      { name: "Character Counter", slug: "character-counter" },
      { name: "Case Converter", slug: "case-converter" },
      { name: "Text Repeater", slug: "text-repeater" },
      { name: "Slug Generator", slug: "slug-generator" },
    ],
  },

  "aadhaar-photo": {
    overview: [
      "UIDAI's Aadhaar enrollment and correction forms specify a 3.5cm × 4.5cm colour photograph with a plain light background and a clear, forward-facing view of the applicant's face. Photo studios routinely charge for a single print in this exact size, even though the underlying task is a straightforward crop and resize once you know the target dimensions.",
      "This tool lets you crop your own photo to the correct 3.5:4.5 proportions directly in your browser, preview the result against the official size, and download a print-ready file within a minute — no studio visit and no waiting for a print counter.",
      "Because Aadhaar enrollment centres can be strict about photo quality and background, understanding what the guidelines actually require — beyond just the pixel dimensions — makes it far more likely your photo is accepted on the first attempt.",
    ],
    steps: [
      { title: "Upload a recent photo", description: "Choose a clear, well-lit frontal photo with a plain background." },
      { title: "Adjust the crop box", description: "Position and resize the crop to fill the 3.5×4.5cm frame correctly." },
      { title: "Check the preview", description: "Confirm your face is centered and clearly visible within the frame." },
      { title: "Generate and download", description: "Download the correctly sized photo, ready for enrollment or update forms." },
    ],
    useCases: [
      { title: "New Aadhaar enrollment", description: "Prepare the required photo for a first-time Aadhaar enrollment application at a Seva Kendra." },
      { title: "Aadhaar update or correction", description: "Generate a fresh photo when updating Aadhaar details that require a new photograph." },
      { title: "Printing at home or a local shop", description: "Download a print-ready file to take to any photo printing counter instead of a specialized studio." },
      { title: "Digital form uploads", description: "Some Aadhaar-related portals accept a digital photo upload matching the same size specification." },
    ],
    tips: [
      "Use a plain white or light-coloured wall as your background — patterns, shadows, or other people in frame can lead to rejection.",
      "Face the camera directly with a neutral expression; avoid tilting your head or wearing sunglasses.",
      "Take the photo in natural daylight or bright indoor lighting to avoid harsh shadows across the face.",
      "Print on standard photo paper rather than plain printer paper for the most durable, form-ready result.",
    ],
    faqs: [
      { q: "Can I use this photo for both new enrollment and Aadhaar update?", a: "Yes, the same 3.5×4.5cm specification applies to both new Aadhaar enrollment and update/correction forms submitted at a Seva Kendra." },
      { q: "What background works best?", a: "A plain white or light-coloured wall works best; avoid patterns, shadows, or other people in the frame." },
      { q: "Can I print this at home?", a: "Yes — download the photo and print it at any photo printing shop or a home printer capable of passport-size photo paper." },
      { q: "Does the photo need to be recent?", a: "Yes, enrollment centres generally expect a photo that reflects your current appearance." },
      { q: "Is my photo uploaded anywhere while I use this tool?", a: "No, cropping and resizing happen entirely in your browser; nothing is uploaded to a server." },
    ],
    relatedTools: [
      { name: "PAN Card Photo Maker", slug: "pan-photo" },
      { name: "Passport Size Photo Maker", slug: "passport-photo" },
      { name: "Image Cropper", slug: "image-cropper" },
      { name: "Image Size Checker", slug: "image-size-checker" },
    ],
  },

  "pan-photo": {
    overview: [
      "The Income Tax Department's PAN application — Form 49A for Indian citizens, Form 49AA for foreign entities — asks for a 2.5cm × 3.5cm photograph attached to the physical form, or uploaded in the same proportions for e-KYC based online applications through NSDL or UTIITSL portals.",
      "Getting the crop ratio exactly right the first time matters more than it might seem: a photo that's noticeably off-spec is one of the more common reasons a PAN application gets flagged for correction, adding days or weeks to an otherwise routine process.",
      "This tool crops your photo precisely to the 2.5:3.5 ratio, shows a live preview so you can confirm framing before finalizing, and produces a file sized correctly for either the physical form or the online upload flow.",
    ],
    steps: [
      { title: "Upload a recent colour photo", description: "Choose a clear photo taken against a plain white background." },
      { title: "Position the crop frame", description: "Adjust the crop to the 2.5×3.5cm proportions PAN forms require." },
      { title: "Preview the result", description: "Check that your face is well-centered within the frame." },
      { title: "Download the photo", description: "Save the correctly sized file for your physical or online application." },
    ],
    useCases: [
      { title: "New PAN card application", description: "Prepare a compliant photo for Form 49A or 49AA when applying for a PAN for the first time." },
      { title: "PAN correction requests", description: "Generate a fresh photo when submitting a PAN detail correction or reprint request." },
      { title: "NSDL/UTIITSL online uploads", description: "Produce a properly sized digital photo for portals that accept online e-KYC-based applications." },
      { title: "Business or minor PAN applications", description: "The same size specification applies across most PAN application categories." },
    ],
    tips: [
      "Use a plain white background specifically — PAN applications are typically stricter about background colour than other document photos.",
      "Avoid tinted glasses; plain glasses are usually acceptable but check current NSDL/UTIITSL guidance if unsure.",
      "Keep a neutral, closed-mouth expression facing the camera directly.",
      "Double-check the printed or uploaded photo against the exact 2.5×3.5cm requirement before submitting your form.",
    ],
    faqs: [
      { q: "Does this work for both new PAN and correction applications?", a: "Yes, the 2.5×3.5cm size applies to Form 49A/49AA for new PAN cards as well as correction or update requests." },
      { q: "Is a colour photo required?", a: "Yes, PAN applications require a recent colour photograph; black-and-white photos are typically rejected." },
      { q: "Can I wear glasses in the photo?", a: "Plain glasses without tinted lenses are usually accepted, but check the latest NSDL/UTIITSL guidelines since requirements can be updated." },
      { q: "How is this different from a passport photo?", a: "PAN photos use a smaller 2.5×3.5cm size compared to the 3.5×4.5cm passport standard, so the two aren't interchangeable." },
    ],
    relatedTools: [
      { name: "Aadhaar Card Photo Maker", slug: "aadhaar-photo" },
      { name: "Passport Size Photo Maker", slug: "passport-photo" },
      { name: "Signature Resizer", slug: "signature-resizer" },
      { name: "Image Size Checker", slug: "image-size-checker" },
    ],
  },

  "passport-photo": {
    overview: [
      "Indian passport applications through Passport Seva require a 35mm × 45mm photograph with the face covering roughly 70-80% of the frame, taken against a plain light background. Many other countries use this same 35×45mm standard for passports and long-stay visas, which makes this crop useful well beyond a single application.",
      "Passport photo rules tend to be among the strictest of any document photo category — expression, background, and even glasses are frequently specified in detail — so getting the framing right in advance meaningfully reduces the chance of a submission being sent back.",
      "This tool crops your photo to the correct 35:45 proportions with a live preview showing how much of the frame your face occupies, helping you match the required framing before you ever visit a passport office.",
    ],
    steps: [
      { title: "Upload a recent photo", description: "Choose a plain-background photo taken directly facing the camera." },
      { title: "Frame your face correctly", description: "Adjust the crop so your face fills roughly 70-80% of the frame." },
      { title: "Review against the spec", description: "Compare the preview to official passport photo guidelines." },
      { title: "Download the finished photo", description: "Save the 35×45mm file ready for your application." },
    ],
    useCases: [
      { title: "New passport applications", description: "Prepare a compliant photo for a first-time Passport Seva application." },
      { title: "Passport renewal", description: "Generate an updated photo reflecting your current appearance for a renewal application." },
      { title: "International visa applications", description: "Several countries accept the same 35×45mm format for visa photo requirements." },
      { title: "Tatkal or expedited applications", description: "Having a correctly sized photo ready in advance avoids delays during time-sensitive applications." },
    ],
    tips: [
      "Most passport authorities ask for a neutral expression with both eyes open and mouth closed, rather than a smile.",
      "Many current guidelines discourage glasses entirely to avoid glare; check your local passport office's exact rule.",
      "Take the photo within the last six months so it closely resembles your current appearance.",
      "Avoid headwear unless worn for religious reasons that are consistently present in daily life.",
    ],
    faqs: [
      { q: "Can I smile in a passport photo?", a: "Most passport authorities, including Passport Seva, ask for a neutral expression with both eyes open and mouth closed." },
      { q: "What if I wear glasses daily?", a: "Many passport guidelines now discourage glasses in the photo entirely to avoid glare; check your local passport office's current rule." },
      { q: "How recent should the photo be?", a: "Passport photos should typically be taken within the last 6 months and closely resemble your current appearance." },
      { q: "Does this size work for other countries too?", a: "The 35×45mm format is used by several countries beyond India for passports and some visa categories, though it's worth confirming the specific destination's requirement." },
    ],
    relatedTools: [
      { name: "Visa Photo Maker", slug: "visa-photo" },
      { name: "Aadhaar Card Photo Maker", slug: "aadhaar-photo" },
      { name: "Image Cropper", slug: "image-cropper" },
      { name: "Image Size Checker", slug: "image-size-checker" },
    ],
  },

  "visa-photo": {
    overview: [
      "The 2×2 inch (51mm × 51mm) square photo format is best known as the US visa and passport photo standard, though several other countries' visa applications share this same square ratio. The requirement is notably stricter than most ID photos: full face forward, both ears typically visible, and a plain white or off-white background completely free of shadows.",
      "Because visa photo rejections can delay an already time-sensitive application process, getting the framing and background right on the first attempt is worth the extra care — re-submitting a rejected photo often means restarting part of the application timeline.",
      "This tool crops your photo to the exact 2×2 inch square, helping you match the strict framing requirement before you submit it through an online visa application system or attach it to a physical form.",
    ],
    steps: [
      { title: "Upload a photo with a plain background", description: "Use a recent photo taken against a white or off-white backdrop." },
      { title: "Crop to the square frame", description: "Adjust the crop so your face is centered within the 2×2 inch square." },
      { title: "Check the framing", description: "Confirm your head size and position match typical visa photo guidance." },
      { title: "Download the square photo", description: "Save the finished file for your visa application." },
    ],
    useCases: [
      { title: "US visa applications", description: "Prepare a photo matching the US Department of State's 2×2 inch square format." },
      { title: "US passport applications", description: "The same square format applies to US passport photo submissions." },
      { title: "Other square-format visa applications", description: "Some other countries' visa processes also use a 2×2 inch or similar square photo requirement." },
      { title: "Online visa photo uploads", description: "Digital visa application systems that specify exact pixel dimensions for a square photo." },
    ],
    tips: [
      "Confirm head size and background rules against the current official guidance for your specific visa category before submitting.",
      "Photos taken on a phone work fine as long as lighting is even and the background is plain.",
      "Avoid shadows on the background by standing a few feet away from the wall rather than directly against it.",
      "If your visa country isn't the US, double-check whether a different photo size (like 35×45mm) is required instead.",
    ],
    faqs: [
      { q: "Does this match the US visa photo requirement exactly?", a: "The 2×2 inch square crop matches the US Department of State format; head size and background rules should still be checked against current official guidance." },
      { q: "Can I use a photo taken on my phone?", a: "Yes, as long as the lighting is even, the background is plain, and the resolution is high enough that the cropped square photo doesn't look blurry." },
      { q: "What if my visa country isn't the US?", a: "Some countries use different visa photo dimensions, like 35×45mm, so check your destination country's embassy website before using this square format." },
      { q: "Should ears be visible in the photo?", a: "Many square-format visa guidelines expect a full-face frontal view; check the specific requirement, since some allow hair covering the ears while others don't." },
    ],
    relatedTools: [
      { name: "Passport Size Photo Maker", slug: "passport-photo" },
      { name: "Aadhaar Card Photo Maker", slug: "aadhaar-photo" },
      { name: "Image Cropper", slug: "image-cropper" },
      { name: "Image Size Checker", slug: "image-size-checker" },
    ],
  },

  "exam-photo": {
    overview: [
      "Competitive exam application portals — SSC, IBPS, Indian Railways, and many state-level boards — commonly ask for a photo around 200×230 pixels with a file size between 20KB and 50KB, small enough to keep upload servers responsive when handling thousands of simultaneous applicants during peak registration windows.",
      "Because exact pixel dimensions and file size limits vary meaningfully between exams, the numbers used here should be treated as a solid, commonly-used starting point rather than a universal rule — always cross-check the specific exam's official notification PDF before finalizing your upload.",
      "This tool crops and compresses your photo toward that common specification, showing both the pixel dimensions and resulting file size so you can confirm it fits comfortably within whatever limit your specific exam notification states.",
    ],
    steps: [
      { title: "Upload a recent photo", description: "Choose a clear, recent photo suitable for identity verification at the exam center." },
      { title: "Crop to the required frame", description: "Adjust the crop toward the common 200×230px specification." },
      { title: "Check the file size", description: "Confirm the result falls within your exam's stated KB range." },
      { title: "Download and verify", description: "Save the file and cross-check dimensions against your exam's official notification." },
    ],
    useCases: [
      { title: "SSC exam applications", description: "Prepare a photo matching the commonly used size specification for SSC recruitment exams." },
      { title: "Banking and IBPS applications", description: "Generate a compliant photo for banking sector recruitment exam portals." },
      { title: "Railway recruitment forms", description: "Meet the small file size requirements typical of Indian Railways application systems." },
      { title: "State-level competitive exams", description: "Many state boards use similar small pixel and file size specifications for photo uploads." },
    ],
    tips: [
      "Always verify the exact pixel size and KB range against your specific exam's official notification PDF before uploading.",
      "Use a recent photo — most exam boards require one taken within the last few months for identity verification purposes.",
      "If your exam's limit is smaller than 20KB, compress further after cropping using an image compressor.",
      "Keep a plain background for the clearest identity verification at the exam center.",
    ],
    faqs: [
      { q: "Why do exam forms have such strict file size limits?", a: "Government exam portals handle thousands of simultaneous applicants, so small, compressed photo files keep upload servers from getting overloaded." },
      { q: "What if my exam asks for a different pixel size?", a: "Use this tool to get close to the right proportions, then check the specific exam's notification for exact dimensions and file size limits." },
      { q: "Should the photo be recent?", a: "Yes — most exam boards require a photo taken within the last few months so it matches your appearance for identity verification." },
      { q: "Can I reuse the same photo across multiple exams?", a: "Only if the size and recency requirements match; many exams share similar specs, but it's worth verifying each notification individually." },
    ],
    relatedTools: [
      { name: "Signature Resizer", slug: "signature-resizer" },
      { name: "Aadhaar Card Photo Maker", slug: "aadhaar-photo" },
      { name: "Image Compressor", slug: "compressor" },
      { name: "Image Size Checker", slug: "image-size-checker" },
    ],
  },

  "signature-resizer": {
    overview: [
      "Online forms — bank KYC processes, exam applications, government portals — frequently ask for a scanned signature under a strict file size limit, typically 10-20KB, uploaded at a small fixed pixel size. A signature photographed on a phone is usually many times too large in both dimensions and file size, and needs cropping plus compression before it will pass an upload check.",
      "This tool crops your signature image tightly to the required frame and compresses it down toward the target file size, so what you upload matches what the form actually expects rather than triggering a vague 'file too large' or 'invalid dimensions' error.",
      "Getting a clean signature scan starts before you even open this tool: the ink color, paper background, and lighting when the signature was captured all affect how well it compresses while staying legible.",
    ],
    steps: [
      { title: "Photograph or scan your signature", description: "Sign in dark ink on plain white paper and capture it in good lighting." },
      { title: "Upload the image", description: "Select or drag the photo of your signature into the tool." },
      { title: "Crop tightly around the signature", description: "Remove excess white space so the signature fills the frame." },
      { title: "Download the resized file", description: "Save the compressed, correctly sized signature for your form." },
    ],
    useCases: [
      { title: "Bank KYC and account opening", description: "Upload a correctly sized signature for online bank account or KYC verification forms." },
      { title: "Exam and government applications", description: "Meet the strict small file size requirements common in competitive exam application portals." },
      { title: "Document e-signing preparation", description: "Prepare a clean signature image for pasting into digital documents or contracts." },
      { title: "Re-uploading after a rejected submission", description: "Fix a signature that was previously rejected for being too large or the wrong dimensions." },
    ],
    tips: [
      "Sign with black or dark blue ink on plain white paper for the cleanest contrast after compression.",
      "Photograph the signature in even lighting to avoid shadows that reduce legibility once compressed.",
      "Crop as tightly as possible around just the signature to maximize how much detail survives compression at a small file size.",
      "If your form's limit is unusually small, try a slightly bolder pen to keep the signature legible after heavy compression.",
    ],
    faqs: [
      { q: "What ink color works best for scanning?", a: "Black or dark blue ink on plain white paper gives the cleanest contrast, which helps the signature stay legible after compression." },
      { q: "Why does my form reject the signature file?", a: "Most rejections happen because the file exceeds the maximum size limit or doesn't match the required pixel dimensions — cropping tightly and downloading here usually resolves both." },
      { q: "Can I use a stylus-drawn signature instead of a scanned one?", a: "Yes, a digitally drawn signature works the same way — upload the image and crop and resize it just like a scanned one." },
      { q: "Is there a standard signature size across all forms?", a: "No, requirements vary by form; always check the specific size and KB limit stated in your application's instructions." },
    ],
    relatedTools: [
      { name: "Exam Photo Resizer", slug: "exam-photo" },
      { name: "PAN Card Photo Maker", slug: "pan-photo" },
      { name: "Image Compressor", slug: "compressor" },
      { name: "Image Size Checker", slug: "image-size-checker" },
    ],
  },
};

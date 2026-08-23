import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const products = [
  ["Ruốc cá hồi", "ruoc-ca-hoi", "mon-tien-loi", "Món tiện lợi", "Ruốc cá hồi tơi mềm, tiện dùng cùng cơm, cháo hoặc bánh mì.", "Hũ đóng gói", true, true, []],
  ["Xúc xích gấc", "xuc-xich-gac", "xuc-xich", "Xúc xích", "Sắc gấc đặc trưng kết hợp trong món xúc xích tiện lợi cho gia đình.", "Theo quy cách", true, false, ["MỚI"]],
  ["Xúc xích gà nấm", "xuc-xich-ga-nam", "xuc-xich", "Xúc xích", "Thịt gà kết hợp nấm, phù hợp cho bữa sáng và bữa ăn nhanh.", "Theo quy cách", true, true, ["BÁN CHẠY"]],
  ["Xúc xích Special", "xuc-xich", "xuc-xich", "Xúc xích", "Dòng xúc xích tiện lợi, dễ chế biến trong nhiều món ăn.", "Theo quy cách", true, false, []],
  ["Chả ức gà healthy", "cha-uc-ga-healthy", "healthy", "Healthy", "Chả ức gà kết hợp rau củ, một lựa chọn nhẹ nhàng cho thực đơn hiện đại.", "Theo quy cách", true, true, ["HEALTHY"]],
  ["Pate Hà Nội", "pate-ha-noi", "pate", "Pate", "Pate phong vị Hà Nội, tiện dùng với bánh mì và các món ăn gia đình.", "Theo quy cách", true, false, []],
  ["Nem chua rán", "nem-chua-ran", "mon-an-vat", "Món ăn vặt", "Nem chua rán giòn bên ngoài, phù hợp cho bữa phụ và tụ họp.", "Theo quy cách", true, true, ["BÁN CHẠY"]],
  ["Lạp xưởng", "lap-xuong", "lap-xuong", "Lạp xưởng", "Lạp xưởng thơm đậm đà, dùng cùng cơm, xôi hoặc món chiên áp chảo.", "Theo quy cách", false, false, []],
  ["Giò xào", "gio-xao", "gio-cha", "Giò chả", "Giò xào với kết cấu giòn, phù hợp mâm cơm và dịp sum họp.", "Theo quy cách", false, false, []],
  ["Giò lụa", "gio-lua", "gio-cha", "Giò chả", "Giò lụa mềm mịn, hương vị quen thuộc trong bữa cơm Việt.", "Theo quy cách", true, false, []],
  ["Giò bò", "gio-bo", "gio-cha", "Giò chả", "Giò bò đậm vị, dễ kết hợp với bánh mì, xôi và mâm cỗ.", "Theo quy cách", false, false, []],
  ["Giò bì", "gio-bi", "gio-cha", "Giò chả", "Giò bì có độ giòn đặc trưng, phục vụ nhiều nhu cầu thưởng thức.", "Theo quy cách", false, false, []],
  ["Gà ủ muối", "ga-u-muoi", "mon-che-bien", "Món chế biến", "Gà ủ muối tiện lợi cho bữa cơm, tiệc nhỏ và các dịp quây quần.", "Theo quy cách", false, false, []],
  ["Dồi sụn", "doi-sun", "mon-an-vat", "Món ăn vặt", "Dồi sụn giòn thơm, phù hợp nướng, áp chảo hoặc dùng trong bữa nhậu.", "Theo quy cách", false, false, []],
  ["Chả sụn", "cha-sun", "gio-cha", "Giò chả", "Chả sụn có kết cấu giòn vui miệng, dễ chế biến.", "Theo quy cách", false, false, []],
  ["Chả ốc Special", "cha-oc", "gio-cha", "Giò chả", "Chả ốc kết hợp nguyên liệu quen thuộc trong một cách thưởng thức tiện lợi.", "Theo quy cách", true, false, []],
  ["Chả cốm Tú Lệ", "cha-com-tu-le", "gio-cha", "Giò chả", "Chả cốm dẻo thơm, gợi nhắc hương vị đặc trưng của ẩm thực Việt.", "Theo quy cách", true, false, []],
  ["Chả cá", "cha-ca", "gio-cha", "Giò chả", "Sản phẩm chả cá trong danh mục Vị Quê Việt. Hình ảnh đang được cập nhật.", "Theo quy cách", false, false, []],
  ["Cá viên chiên", "ca-vien-chien", "mon-an-vat", "Món ăn vặt", "Cá viên chiên tiện chế biến cho bữa phụ và các món ăn nhanh.", "Theo quy cách", false, false, []],
];

const productBody = (name) => `## Giới thiệu\n\n${name} thuộc danh mục thực phẩm chế biến của Vị Quê Việt, hướng đến sự tiện lợi và hương vị gần gũi trong bữa ăn Việt.\n\n## Hướng dẫn sử dụng\n\n- Chế biến phù hợp theo hướng dẫn trên bao bì sản phẩm.\n- Dùng trong bữa cơm, bữa sáng hoặc món ăn nhẹ tùy sản phẩm.\n\n## Bảo quản\n\nBảo quản và sử dụng theo thông tin được in trên bao bì. Không sử dụng khi bao bì bị hư hỏng hoặc sản phẩm có dấu hiệu bất thường.\n\n## Thông tin cần xác nhận\n\nThành phần chi tiết, khối lượng tịnh, hạn dùng và quy cách bán sỉ được cung cấp theo từng lô sản phẩm. Vui lòng liên hệ Vị Quê Việt để nhận thông tin hiện hành.\n`;

for (let index = 0; index < products.length; index += 1) {
  const [name, slug, category, categoryLabel, excerpt, weight, featured, bestSeller, badges] = products[index];
  const hasImage = !["cha-ca", "ca-vien-chien"].includes(slug);
  const thumbnail = hasImage ? `/images/products/${slug}/card.webp` : "/images/products/placeholder-product.svg";
  const heroImage = hasImage ? `/images/products/${slug}/hero.webp` : "/images/products/placeholder-product.svg";
  const frontmatter = [
    "---",
    `name: "${name}"`,
    `slug: "${slug}"`,
    `category: "${category}"`,
    `categoryLabel: "${categoryLabel}"`,
    `excerpt: "${excerpt}"`,
    `weight: "${weight}"`,
    `thumbnail: "${thumbnail}"`,
    `heroImage: "${heroImage}"`,
    `featured: ${featured}`,
    `bestSeller: ${bestSeller}`,
    `status: "published"`,
    `sortOrder: ${index + 1}`,
    `imagePending: ${!hasImage}`,
    "badges:",
    ...(badges.length ? badges.map((badge) => `  - "${badge}"`) : ["  - \"\""]),
    "gallery:",
    `  - "${heroImage}"`,
    `  - "${thumbnail}"`,
    "---",
    "",
  ].join("\n");
  const target = join(root, "content", "products", `${slug}.mdx`);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, frontmatter + productBody(name), "utf8");
}

const posts = [
  ["quy-trinh-san-xuat-khep-kin", "Quy trình sản xuất khép kín cần những gì?", "Sản xuất", "Một góc nhìn dễ hiểu về phân khu, vệ sinh và kiểm soát trong sản xuất thực phẩm.", "/images/news/quy-trinh-san-xuat.webp", "2026-08-18"],
  ["chon-nguyen-lieu-cho-thuc-pham-che-bien", "Chọn nguyên liệu cho thực phẩm chế biến", "Chất lượng", "Những tiêu chí nền tảng khi lựa chọn và tiếp nhận nguyên liệu.", "/images/news/nguyen-lieu-sach.webp", "2026-08-12"],
  ["nem-chua-ran-ngon-hon-khi-dung-cach", "Nem chua rán ngon hơn khi dùng đúng cách", "Món ngon", "Gợi ý chế biến và thưởng thức nem chua rán giòn ngon tại nhà.", "/images/news/nem-chua-ran.webp", "2026-08-05"],
  ["bao-quan-thuc-pham-che-bien", "Bảo quản thực phẩm chế biến đúng cách", "Kiến thức", "Các nguyên tắc đơn giản giúp duy trì chất lượng sản phẩm sau khi mua.", "/images/factory/quality-control.webp", "2026-07-28"],
  ["oem-odm-thuc-pham-la-gi", "OEM/ODM thực phẩm là gì?", "OEM/ODM", "Phân biệt hai mô hình hợp tác và những thông tin doanh nghiệp nên chuẩn bị.", "/images/oem/oem-process.webp", "2026-07-20"],
  ["goi-y-bua-sang-tien-loi", "Gợi ý bữa sáng tiện lợi cho gia đình", "Món ngon", "Kết hợp những món quen thuộc để chuẩn bị bữa sáng nhanh gọn.", "/images/brand/hero-products.webp", "2026-07-12"],
  ["ruoc-ca-hoi-an-cung-mon-gi", "Ruốc cá hồi ăn cùng món gì?", "Món ngon", "Một vài cách kết hợp ruốc cá hồi trong bữa cơm hằng ngày.", "/images/products/ruoc-ca-hoi/hero.webp", "2026-07-04"],
];

const postBody = (title) => `## ${title}\n\nNội dung này cung cấp thông tin tham khảo để người đọc hiểu rõ hơn về thực phẩm chế biến và cách sử dụng phù hợp trong đời sống hằng ngày.\n\n## Điều nên lưu ý\n\n- Luôn đọc kỹ thông tin trên bao bì.\n- Bảo quản đúng điều kiện được nhà sản xuất hướng dẫn.\n- Chọn cách chế biến phù hợp với từng sản phẩm.\n\n## Cần tư vấn thêm?\n\nLiên hệ Vị Quê Việt để được cung cấp thông tin sản phẩm, quy cách hiện hành hoặc trao đổi nhu cầu OEM/ODM.\n`;

for (const [slug, title, category, excerpt, cover, publishedAt] of posts) {
  const file = `---\ntitle: "${title}"\nslug: "${slug}"\ncategory: "${category}"\nexcerpt: "${excerpt}"\ncover: "${cover}"\npublishedAt: "${publishedAt}"\nauthor: "Vị Quê Việt"\nstatus: "published"\n---\n\n${postBody(title)}`;
  const target = join(root, "content", "posts", `${slug}.mdx`);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, file, "utf8");
}

console.log(`Created ${products.length} product files and ${posts.length} post files.`);

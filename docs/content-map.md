# Content map

| Route | Content source | Rendering | Notes |
|---|---|---|---|
| `/` | Product and post metadata | Static | Long-form marketing homepage |
| `/san-pham` | `content/products/*.mdx` | Static | 8 products per page |
| `/san-pham/page/[page]` | `content/products/*.mdx` | Static params | Pages 2–3 |
| `/san-pham/[slug]` | `content/products/*.mdx` | Static params | Product schema and related products |
| `/oem-odm` | Page component + real factory assets | Static | B2B contact journey |
| `/nha-may` | Page component + factory assets | Static | No unsourced certification claims |
| `/ve-vi-que-viet` | Page component | Static | Unsourced milestones/stats intentionally omitted |
| `/tin-tuc` | `content/posts/*.mdx` | Static | 6 articles per page |
| `/tin-tuc/page/[page]` | `content/posts/*.mdx` | Static params | Page 2 |
| `/tin-tuc/[slug]` | `content/posts/*.mdx` | Static params | Article schema and related posts |
| `/lien-he` | Environment-backed contact fields | Static | No backend form |

## Content safeguards

- Phone numbers are transcribed from the supplied marketing assets.
- Address and email render as “đang cập nhật” unless configured with `NEXT_PUBLIC_CONTACT_ADDRESS` and `NEXT_PUBLIC_CONTACT_EMAIL`.
- Certification names, partner logos, founding milestones, prices and production statistics are not published without a verified source.

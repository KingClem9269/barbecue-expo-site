# Contact Form Storyblok Component Setup

Create the contact form component in Storyblok so you can place it anywhere via the platform.

## Create via API (curl)

```bash
curl -X POST "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/components/" \
  -H "Authorization: YOUR_MANAGEMENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "component": {
      "name": "contact-form",
      "display_name": "Contact Form",
      "is_nestable": true,
      "is_root": false,
      "schema": {}
    }
  }'
```

Replace `YOUR_SPACE_ID` and `YOUR_MANAGEMENT_TOKEN` with your values.

## Add to allowed components

Add `contact-form` to the whitelist of any nestable container where you want to place it, e.g.:

- **Section** (content field)
- **Container** (content field)
- **Grid** (content field)
- **Flex** (content field)

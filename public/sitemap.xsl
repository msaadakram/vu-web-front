<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap — VirtualUPK</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; background: #f8fafc; color: #1e293b; }
          header { background: #0f172a; color: white; padding: 16px 32px; }
          header h1 { margin: 0; font-size: 1.4rem; }
          header p { margin: 4px 0 0; font-size: .85rem; opacity: .7; }
          main { max-width: 960px; margin: 32px auto; padding: 0 16px; }
          table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.1); }
          th { background: #1e40af; color: white; text-align: left; padding: 12px 16px; font-size: .8rem; text-transform: uppercase; letter-spacing: .05em; }
          td { padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: .9rem; }
          tr:last-child td { border-bottom: none; }
          tr:hover td { background: #eff6ff; }
          a { color: #1d4ed8; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: .75rem; font-weight: 600; background: #dbeafe; color: #1e40af; }
        </style>
      </head>
      <body>
        <header>
          <h1>&#x1F5FA;&#xFE0F; XML Sitemap Index</h1>
          <p>VirtualUPK — Google Search Engine Sitemap</p>
        </header>
        <main>
          <xsl:choose>
            <!-- Sitemap Index -->
            <xsl:when test="sitemap:sitemapindex">
              <h2>Sitemap Index — <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sub-sitemaps</h2>
              <table>
                <tr><th>Sitemap URL</th><th>Last Modified</th></tr>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <tr>
                    <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                    <td><xsl:value-of select="sitemap:lastmod"/></td>
                  </tr>
                </xsl:for-each>
              </table>
            </xsl:when>
            <!-- URL Set -->
            <xsl:otherwise>
              <h2>URLs — <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> pages</h2>
              <table>
                <tr><th>URL</th><th>Last Modified</th><th>Change Freq</th><th>Priority</th></tr>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                    <td><xsl:value-of select="sitemap:lastmod"/></td>
                    <td><span class="badge"><xsl:value-of select="sitemap:changefreq"/></span></td>
                    <td><xsl:value-of select="sitemap:priority"/></td>
                  </tr>
                </xsl:for-each>
              </table>
            </xsl:otherwise>
          </xsl:choose>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

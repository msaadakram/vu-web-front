<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap — VirtualU</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #f8fafc;
            color: #1c3557;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          header {
            background: linear-gradient(135deg, #1c3557 0%, #2a4a73 100%);
            color: white;
            padding: 24px 32px;
            border-bottom: 3px solid #4eafc4;
          }
          header h1 {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.02em;
          }
          header .subtitle {
            margin-top: 4px;
            font-size: 0.875rem;
            opacity: 0.7;
            font-weight: 400;
          }
          header .meta {
            margin-top: 12px;
            font-size: 0.8rem;
            opacity: 0.6;
            display: flex;
            gap: 24px;
          }
          main {
            flex: 1;
            max-width: 960px;
            margin: 32px auto;
            padding: 0 16px;
            width: 100%;
          }
          .summary {
            display: flex;
            gap: 16px;
            margin-bottom: 24px;
            flex-wrap: wrap;
          }
          .stat {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 14px 20px;
            flex: 1;
            min-width: 120px;
            box-shadow: 0 1px 3px rgba(0,0,0,.04);
          }
          .stat .value {
            font-size: 1.5rem;
            font-weight: 700;
            color: #4eafc4;
            line-height: 1.2;
          }
          .stat .label {
            font-size: 0.75rem;
            color: #64788f;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: 500;
          }
          .card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,.04);
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            background: #f0f7fa;
            color: #1c3557;
            text-align: left;
            padding: 12px 16px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            border-bottom: 2px solid #e2e8f0;
          }
          td {
            padding: 10px 16px;
            border-bottom: 1px solid #f0f4f8;
            font-size: 0.875rem;
            vertical-align: middle;
          }
          tr:last-child td { border-bottom: none; }
          tr:hover td { background: #f8fafc; }
          a {
            color: #4eafc4;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            color: #2a8aa3;
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: capitalize;
          }
          .badge-daily { background: #dbeafe; color: #1e40af; }
          .badge-weekly { background: #e0f2fe; color: #0369a1; }
          .badge-monthly { background: #dcfce7; color: #166534; }
          .badge-yearly { background: #f3e8ff; color: #7c3aed; }
          .priority-bar {
            display: inline-block;
            height: 6px;
            border-radius: 3px;
            background: #e2e8f0;
            width: 60px;
            vertical-align: middle;
            overflow: hidden;
          }
          .priority-bar .fill {
            display: block;
            height: 100%;
            border-radius: 3px;
            background: linear-gradient(90deg, #4eafc4, #2a8aa3);
          }
          .url-cell {
            max-width: 420px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          footer {
            text-align: center;
            padding: 20px;
            font-size: 0.8rem;
            color: #64788f;
            border-top: 1px solid #e2e8f0;
            margin-top: 32px;
          }
          footer a { color: #4eafc4; font-weight: 500; }
          .sitemap-link {
            display: inline-block;
            padding: 8px 16px;
            background: #f0f7fa;
            border-radius: 8px;
            font-size: 0.8rem;
            color: #1c3557;
            margin-top: 8px;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>XML Sitemap</h1>
          <p class="subtitle">VirtualU — Virtual University of Pakistan Study Portal</p>
          <p class="meta">
            <span>Generated: <xsl:value-of select="current-dateTime()"/></span>
          </p>
        </header>
        <main>
          <xsl:choose>
            <!-- Sitemap Index -->
            <xsl:when test="sitemap:sitemapindex">
              <div class="summary">
                <div class="stat">
                  <div class="value"><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></div>
                  <div class="label">Sub-sitemaps</div>
                </div>
              </div>
              <div class="card">
              <table>
                <tr>
                  <th>Sitemap</th>
                  <th>Last Modified</th>
                </tr>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <tr>
                    <td class="url-cell"><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                    <td><xsl:value-of select="concat(substring(sitemap:lastmod, 1, 10), ' ', substring(sitemap:lastmod, 12, 8))"/></td>
                  </tr>
                </xsl:for-each>
              </table>
              </div>
              <p class="sitemap-link">&#x2190; <a href="/sitemap.xml">View main sitemap</a></p>
            </xsl:when>
            <!-- URL Set -->
            <xsl:otherwise>
              <div class="summary">
                <div class="stat">
                  <div class="value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
                  <div class="label">Pages indexed</div>
                </div>
                <div class="stat">
                  <div class="value"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority &gt;= 0.8])"/></div>
                  <div class="label">High priority</div>
                </div>
                <div class="stat">
                  <div class="value"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:changefreq = 'daily'])"/></div>
                  <div class="label">Daily updates</div>
                </div>
              </div>
              <div class="card">
              <table>
                <tr>
                  <th>URL</th>
                  <th>Last Modified</th>
                  <th>Frequency</th>
                  <th>Priority</th>
                </tr>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <xsl:sort select="sitemap:priority" order="descending" data-type="number"/>
                  <tr>
                    <td class="url-cell"><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                    <td><xsl:value-of select="concat(substring(sitemap:lastmod, 1, 10), ' ', substring(sitemap:lastmod, 12, 8))"/></td>
                    <td>
                      <span class="badge">
                        <xsl:attribute name="class">
                          <xsl:text>badge </xsl:text>
                          <xsl:value-of select="sitemap:changefreq"/>
                        </xsl:attribute>
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <span class="priority-bar">
                        <span class="fill">
                          <xsl:attribute name="style">
                            <xsl:text>width: </xsl:text>
                            <xsl:value-of select="sitemap:priority * 100"/>
                            <xsl:text>%</xsl:text>
                          </xsl:attribute>
                        </span>
                      </span>
                      <span style="margin-left: 8px; font-size: 0.8rem; color: #64788f;">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </table>
              </div>
              <p class="sitemap-link">&#x2190; <a href="/sitemap_index.xml">View sitemap index</a></p>
            </xsl:otherwise>
          </xsl:choose>
        </main>
        <footer>
          <p>
            Powered by <a href="https://virtualuniversity.app">VirtualU</a> &mdash;
            Automated XML Sitemap for Search Engine Optimization
          </p>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

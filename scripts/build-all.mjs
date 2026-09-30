import { execSync, execFileSync } from 'node:child_process'
import { cpSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const site = join(root, 'site')
const repoBase = '/WEB-INTERFACE/'

const apps = [
  { slug: 'counter-app', title: 'Counter App', unit: 1, kind: 'html', from: 'UNIT 1 PROJECTS/Counter App.html' },
  { slug: 'student-profile', title: 'Student Profile', unit: 1, kind: 'html', from: 'UNIT 1 PROJECTS/Student profile.html' },
  { slug: 'dashboard', title: 'Dashboard', unit: 2, kind: 'vite', from: 'UNIT 2 PROJECTS/Dashboard/dashboard' },
  { slug: 'hobbycards', title: 'Hobby Cards', unit: 2, kind: 'vite', from: 'UNIT 2 PROJECTS/hobbycards/React/React' },
  { slug: 'attendance', title: 'Attendance', unit: 3, kind: 'vite', from: 'UNIT 3 PROJECTS/Attendance/attendance' },
  { slug: 'calculator', title: 'Calculator', unit: 3, kind: 'vite', from: 'UNIT 3 PROJECTS/Calculator/calculator' },
  { slug: 'react-starter', title: 'React Starter (Calculator folder)', unit: 3, kind: 'vite', from: 'UNIT 3 PROJECTS/Calculator' },
  { slug: 'form-validation', title: 'Form Validation', unit: 4, kind: 'vite', from: 'UNIT 4 PROJECTS/Unit 4/form-validation' },
  { slug: 'student-report', title: 'Student Performance Report', unit: 5, kind: 'vite', from: 'UNIT 5 PROJECTS/student-report' },
]

const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit', shell: true })

const runVite = (cwd, base) =>
  execFileSync(process.execPath, [join(cwd, 'node_modules', 'vite', 'bin', 'vite.js'), 'build', '--base', base], {
    cwd,
    stdio: 'inherit',
  })

const only = process.argv.slice(2)
const selected = only.length ? apps.filter((a) => only.includes(a.slug)) : apps
if (only.length && selected.length !== only.length) {
  const missing = only.filter((s) => !apps.some((a) => a.slug === s))
  throw new Error(`unknown slug(s): ${missing.join(', ')}`)
}

rmSync(site, { recursive: true, force: true })
mkdirSync(site, { recursive: true })

const built = []

for (const app of selected) {
  const from = join(root, app.from)
  const dest = join(site, app.slug)
  mkdirSync(dest, { recursive: true })
  console.log(`\n### building ${app.slug}  <-  ${app.from}`)

  if (app.kind === 'html') {
    cpSync(from, join(dest, 'index.html'))
  } else {
    if (existsSync(join(from, 'node_modules'))) {
      console.log('    node_modules present, skipping install')
    } else {
      try {
        run('npm ci --no-audit --no-fund', from)
      } catch {
        run('npm install --no-audit --no-fund', from)
      }
    }
    runVite(from, `${repoBase}${app.slug}/`)
    const dist = join(from, 'dist')
    if (!existsSync(join(dist, 'index.html'))) {
      throw new Error(`build produced no dist/index.html for ${app.slug} (${app.from})`)
    }
    cpSync(dist, dest, { recursive: true })
    rmSync(dist, { recursive: true, force: true })
  }

  built.push(app)
}

const unit = (n) => built.filter((a) => a.unit === n)

const card = (a) => `<li><a href="${repoBase}${a.slug}/">${a.title}</a><span>${a.from}</span></li>`

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>WEB INTERFACE - All Projects</title>
<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 48px 24px; font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
         background: #0f1117; color: #e6e6e6; }
  .wrap { max-width: 900px; margin: 0 auto; }
  h1 { font-size: 2rem; margin: 0 0 6px; }
  .sub { color: #8b93a7; margin: 0 0 40px; }
  h2 { font-size: 1rem; text-transform: uppercase; letter-spacing: .1em; color: #8b93a7;
       border-bottom: 1px solid #262b36; padding-bottom: 8px; margin: 32px 0 16px; }
  ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
  li { display: flex; flex-direction: column; gap: 4px; background: #171a22; border: 1px solid #262b36;
       border-radius: 10px; padding: 14px 16px; }
  a { color: #6ea8fe; text-decoration: none; font-weight: 600; font-size: 1.05rem; }
  a:hover { text-decoration: underline; }
  span { color: #6c7488; font-size: .82rem; font-family: ui-monospace, Menlo, Consolas, monospace; }
  footer { margin-top: 48px; color: #6c7488; font-size: .85rem; }
</style>
</head>
<body>
<div class="wrap">
  <h1>WEB INTERFACE</h1>
  <p class="sub">All unit projects &mdash; every project has its own link.</p>
${[...new Set(built.map((a) => a.unit))]
  .sort((a, b) => a - b)
  .map(
    (n) =>
      `\n  <h2>Unit ${n}</h2>\n  <ul>\n${unit(n).map(card).join('\n')}\n  </ul>`,
  )
  .join('\n')}
  <footer>Deployed automatically with GitHub Actions.</footer>
</div>
</body>
</html>
`

writeFileSync(join(site, 'index.html'), html)
console.log(`\nDone. ${built.length} projects built into ./site`)

#!/usr/bin/env tsx
/**
 * Generate pre-built globals.css + layout.tsx for all 5 themes.
 * Output: src/themes/generated/<theme-id>/globals.css + layout.tsx
 *
 * The n8n workflow can grab the right pair based on Haiku's theme pick.
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { themes } from '../src/themes/index'

const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'src/themes/generated')

// Clean and create output dir
if (fs.existsSync(OUT_DIR)) fs.rmSync(OUT_DIR, { recursive: true })
fs.mkdirSync(OUT_DIR, { recursive: true })

for (const themeId of Object.keys(themes)) {
  // Apply theme (writes to src/app/)
  execSync(`npx tsx scripts/apply-theme.ts ${themeId}`, { cwd: ROOT, stdio: 'inherit' })

  // Copy generated files to themes/generated/<id>/
  const themeDir = path.join(OUT_DIR, themeId)
  fs.mkdirSync(themeDir, { recursive: true })
  fs.copyFileSync(path.join(ROOT, 'src/app/globals.css'), path.join(themeDir, 'globals.css'))
  fs.copyFileSync(path.join(ROOT, 'src/app/layout.tsx'), path.join(themeDir, 'layout.tsx'))

  console.log(`   📁 ${themeDir}/`)
}

// Restore forest as default
execSync(`npx tsx scripts/apply-theme.ts forest`, { cwd: ROOT, stdio: 'inherit' })

console.log(`\n🎨 All 5 themes generated in src/themes/generated/`)
console.log(`   Default restored to: forest\n`)

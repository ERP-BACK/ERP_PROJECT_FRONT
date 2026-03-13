# Skill Registry — erp_project

Generated: 2026-03-13

## User-Level Skills (`~/.claude/skills/`)

| Name | Path | Trigger / Description |
|------|------|-----------------------|
| `find-skills` | `~/.claude/skills/find-skills/SKILL.md` | Discover and install agent skills. Trigger: "find a skill for X", "is there a skill for X", user wants to extend capabilities. |
| `interface-design` | `~/.claude/skills/interface-design/SKILL.md` (project override: `.claude/skills/interface-design/SKILL.md`) | Interface design for dashboards, admin panels, apps, and data interfaces. NOT for marketing/landing pages. |
| `sdd-explore` | `~/.claude/skills/sdd-explore/SKILL.md` | Explore and investigate ideas before committing to a change. Trigger: when orchestrator launches to think through a feature, investigate codebase, or clarify requirements. |
| `sdd-propose` | `~/.claude/skills/sdd-propose/SKILL.md` | Create a change proposal with intent, scope, and approach. Trigger: when orchestrator launches to create/update a proposal for a change. |
| `sdd-spec` | `~/.claude/skills/sdd-spec/SKILL.md` | Write specifications with requirements and scenarios (delta specs for changes). Trigger: when orchestrator launches to write/update specs. |
| `sdd-design` | `~/.claude/skills/sdd-design/SKILL.md` | Create technical design document with architecture decisions and approach. Trigger: when orchestrator launches to write/update the technical design. |
| `sdd-tasks` | `~/.claude/skills/sdd-tasks/SKILL.md` | Break down a change into an implementation task checklist. Trigger: when orchestrator launches to create/update task breakdown. |
| `sdd-apply` | `~/.claude/skills/sdd-apply/SKILL.md` | Implement tasks from a change, writing actual code following specs and design. Trigger: when orchestrator launches to implement tasks. |
| `sdd-verify` | `~/.claude/skills/sdd-verify/SKILL.md` | Validate that implementation matches specs, design, and tasks. Trigger: when orchestrator launches to verify a completed change. |
| `sdd-archive` | `~/.claude/skills/sdd-archive/SKILL.md` | Sync delta specs to main specs and archive a completed change. Trigger: when orchestrator launches to archive a change. |
| `skill-registry` | `~/.claude/skills/skill-registry/SKILL.md` | Create or update the skill registry. Trigger: "update skills", "skill registry", "actualizar skills", "update registry". |
| `sdd-init` | `~/.claude/skills/sdd-init/SKILL.md` | Initialize SDD context in any project. Trigger: "sdd init", "iniciar sdd", "openspec init". |

## Project-Level Skills (`.claude/skills/`)

| Name | Path | Trigger / Description |
|------|------|-----------------------|
| `interface-design` | `.claude/skills/interface-design/SKILL.md` | Project-specific override of interface-design skill. Use when building UI components, dashboards, forms, or list pages for this ERP. Overrides user-level interface-design. |

## Project Convention Files

| File | Purpose |
|------|---------|
| `components.json` | shadcn/ui config — style: new-york, baseColor: neutral, cssVariables: true, icon library: lucide, RSC: true |

## Notes

- Project-level skills override user-level skills with the same name.
- No `agents.md`, `CLAUDE.md` (project-level), or `.cursorrules` found in project root.
- SDD skills (`sdd-*`) are orchestrator-managed — loaded by the orchestrator, not directly by sub-agents.
- Sub-agents doing UI work SHOULD load `interface-design`.
- Sub-agents doing implementation SHOULD load `sdd-apply`.
- Sub-agents searching for new skills SHOULD load `find-skills`.

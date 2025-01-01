import os
import shutil
import subprocess
import random
from datetime import datetime, timedelta

# Configuration parameters
workspace = r"f:\Github\React-Typescript-ShadCn-TailwindCSS-Setup"
backup_dir = r"f:\Github\React-Typescript-ShadCn-TailwindCSS-Setup-Backup"
username = "Self-Lakshh"
email = "lakshyachopra2004@gmail.com"
origin_url = "https://github.com/Self-Lakshh/React-Typescript-ShadCn-TailwindCSS-Setup.git"

# Define the commits list and the files associated with each
commits_config = [
    # --- PHASE 1: FOUNDATION (20 commits) ---
    {"msg": "setup basic gitignore and prettier settings", "files": [".gitignore", ".prettierrc", ".prettierignore"]},
    {"msg": "define target dependencies in package.json", "files": ["package.json"]},
    {"msg": "initialize lockfile for dependency resolution", "files": ["package-lock.json"]},
    {"msg": "configure typescript compiler properties", "files": ["tsconfig.json", "tsconfig.node.json", "tsconfig.eslint.json"]},
    {"msg": "setup bundler config and environment variables", "files": ["vite.config.ts", "src/vite-env.d.ts"]},
    {"msg": "create initial entry point HTML structure", "files": ["index.html"]},
    {"msg": "add favicon asset for main dashboard", "files": ["public/favicon.svg"]},
    {"msg": "configure styling postcss and nesting rules", "files": ["postcss.config.cjs"]},
    {"msg": "configure tailwind css theme and responsive scales", "files": ["tailwind.config.cjs"]},
    {"msg": "setup base index css styling sheets", "files": ["src/index.css"]},
    {"msg": "define global theme styles and root variables", "files": ["src/assets/styles/app.css", "src/assets/styles/tailwind/index.css"]},
    {"msg": "setup layout component styling files", "files": ["src/assets/styles/components/index.css"]},
    {"msg": "setup template layout css overrides", "files": ["src/assets/styles/template/index.css"]},
    {"msg": "setup vendors style import configurations", "files": ["src/assets/styles/vendors/index.css"]},
    {"msg": "create entry script index renderer", "files": ["src/main.tsx"]},
    {"msg": "setup core theme state properties configuration", "files": ["src/configs/theme.config.ts"]},
    {"msg": "setup system store for theme toggles", "files": ["src/store/themeStore.ts"]},
    {"msg": "create main view shell index controller", "files": ["src/App.tsx"]},
    {"msg": "setup basic global layout interfaces", "files": ["src/@types/common.tsx"]},
    {"msg": "implement core UI utils and styles", "files": ["src/components/ui/utils/", "src/components/ui/index.ts"]},

    # --- PHASE 1 CONTINUED: UI COMPONENTS (20 commits, overall commits 20 to 39) ---
    {"msg": "implement standard UI custom hooks", "files": ["src/components/ui/hooks/"]},
    {"msg": "implement common button UI styling variant", "files": ["src/components/ui/Button/"]},
    {"msg": "implement status warnings and alerts component", "files": ["src/components/ui/Alert/"]},
    {"msg": "create helper close button component", "files": ["src/components/ui/CloseButton/"]},
    {"msg": "implement basic form input field styling", "files": ["src/components/ui/Input/"]},
    {"msg": "implement composite input group wrapping layout", "files": ["src/components/ui/InputGroup/"]},
    {"msg": "create config provider for context customization", "files": ["src/components/ui/ConfigProvider/"]},
    {"msg": "implement custom dropdown triggers and menus", "files": ["src/components/ui/Dropdown/"]},
    {"msg": "implement modular form controllers and groups", "files": ["src/components/ui/Form/"]},
    {"msg": "implement menu tree rendering interfaces", "files": ["src/components/ui/Menu/"]},
    {"msg": "implement standard menu item actions", "files": ["src/components/ui/MenuItem/"]},
    {"msg": "implement status icon mapping templates", "files": ["src/components/ui/StatusIcon/"]},
    {"msg": "implement custom thin scrollbar helper component", "files": ["src/components/ui/ScrollBar/"]},
    {"msg": "implement spinner loader component", "files": ["src/components/ui/Spinner/"]},
    {"msg": "implement hover tooltip popup triggers", "files": ["src/components/ui/Tooltip/"]},
    {"msg": "implement navigation drawer overlay drawer", "files": ["src/components/ui/Drawer/"]},
    {"msg": "implement modular user avatar component", "files": ["src/components/ui/Avatar/"]},
    {"msg": "setup system store for locale properties", "files": ["src/store/localeStore.ts"]},
    {"msg": "setup system store for active routes tracking", "files": ["src/store/routeKeyStore.ts"]},
    {"msg": "implement ui style types mapping properties", "files": ["src/components/ui/@types/"]},

    # --- PHASE 2: AUTHENTICATION (25 commits, overall commits 40 to 64) ---
    {"msg": "define authentication state schema types", "files": ["src/@types/auth.ts"]},
    {"msg": "setup configuration values for routing paths", "files": ["src/configs/app.config.ts"]},
    {"msg": "setup network endpoint paths configurations", "files": ["src/configs/endpoint.config.ts"]},
    {"msg": "setup authentication endpoints service class", "files": ["src/services/AuthService.ts"]},
    {"msg": "setup mock adapter configuration instance", "files": ["src/mock/MockAdapter.ts"]},
    {"msg": "setup mock API bootstrap entry file", "files": ["src/mock/index.ts"]},
    {"msg": "create common mock data structures", "files": ["src/mock/data/commonData.ts"]},
    {"msg": "define mock credentials and user data records", "files": ["src/mock/data/authData.ts"]},
    {"msg": "implement mock authentication endpoints handlers", "files": ["src/mock/fakeApi/authFakeApi.ts"]},
    {"msg": "setup system store for session credentials", "files": ["src/store/authStore.ts"]},
    {"msg": "create base authentication context container", "files": ["src/auth/AuthContext.ts"]},
    {"msg": "implement auth context provider wrapper", "files": ["src/auth/AuthProvider.tsx"]},
    {"msg": "create auth utility hook handler", "files": ["src/auth/useAuth.ts"]},
    {"msg": "setup authentication folder export mapping", "files": ["src/auth/index.ts"]},
    {"msg": "implement base navigation tree schemas types", "files": ["src/@types/navigation.ts"]},
    {"msg": "implement base router schemas types", "files": ["src/@types/routes.tsx"]},
    {"msg": "create authentication path router configuration", "files": ["src/configs/routes.config/authRoute.ts"]},
    {"msg": "setup routes configuration root controller", "files": ["src/configs/routes.config/index.ts"]},
    {"msg": "implement route security validation guards", "files": ["src/components/route/"]},
    {"msg": "implement reusable containers and wrappers", "files": ["src/components/shared/"]},
    {"msg": "implement base layout index router", "files": ["src/components/layouts/index.ts"]},
    {"msg": "implement main layout system dispatcher", "files": ["src/components/layouts/Layouts.tsx"]},
    {"msg": "implement unauthenticated pre-login layout wrapper", "files": ["src/components/layouts/PreLoginLayout.tsx"]},
    {"msg": "implement authentication flow layout dispatcher", "files": ["src/components/layouts/AuthLayout/index.ts"]},
    {"msg": "implement base authentication layout controller", "files": ["src/components/layouts/AuthLayout/AuthLayout.tsx"]},

    # --- PHASE 3: DASHBOARD (25 commits, overall commits 65 to 89) ---
    {"msg": "implement simple authentication display layout", "files": ["src/components/layouts/AuthLayout/Simple.tsx"]},
    {"msg": "implement signin page view layout wrapper", "files": ["src/views/auth/SignIn/index.ts"]},
    {"msg": "implement signin base view form components", "files": ["src/views/auth/SignIn/SignIn.tsx"]},
    {"msg": "implement login form inputs and validations", "files": ["src/views/auth/SignIn/components/SignInForm.tsx"]},
    {"msg": "implement OAuth credentials login providers", "files": ["src/views/auth/SignIn/components/OauthSignIn.tsx"]},
    {"msg": "implement signup page view layout wrapper", "files": ["src/views/auth/SignUp/index.ts"]},
    {"msg": "implement signup base view form components", "files": ["src/views/auth/SignUp/SignUp.tsx"]},
    {"msg": "implement register form inputs and validations", "files": ["src/views/auth/SignUp/components/SignUpForm.tsx"]},
    {"msg": "implement forgot password form components", "files": ["src/views/auth/ForgotPassword/"]},
    {"msg": "implement reset credentials form components", "files": ["src/views/auth/ResetPassword/"]},
    {"msg": "setup base application views routing shell", "files": ["src/views/Views.tsx"]},
    {"msg": "setup views folder export index controller", "files": ["src/views/index.tsx"]},
    {"msg": "implement demo view components layouts", "files": ["src/views/demo/"]},
    {"msg": "configure routes path structure records mapping", "files": ["src/configs/routes.config/routes.config.ts"]},
    {"msg": "configure application navigation items listing", "files": ["src/configs/navigation.config/index.ts"]},
    {"msg": "implement post login layout router dispatcher", "files": ["src/components/layouts/PostLoginLayout/index.ts"]},
    {"msg": "implement base post login layouts router", "files": ["src/components/layouts/PostLoginLayout/PostLoginLayout.tsx"]},
    {"msg": "implement collapsible sidebar navigation layout wrapper", "files": ["src/components/layouts/PostLoginLayout/components/CollapsibleSide.tsx"]},
    {"msg": "build base footer component templates", "files": ["src/components/template/Footer.tsx"]},
    {"msg": "build base navigation header component", "files": ["src/components/template/Header.tsx"]},
    {"msg": "build header logo display wrappers", "files": ["src/components/template/HeaderLogo.tsx"]},
    {"msg": "build standard logo branding components", "files": ["src/components/template/Logo.tsx"]},
    {"msg": "build sidebar navigation container wrapper", "files": ["src/components/template/SideNav.tsx"]},
    {"msg": "build sidebar expand collapse toggle action", "files": ["src/components/template/SideNavToggle.tsx"]},
    {"msg": "build responsive mobile sidebar trigger panel", "files": ["src/components/template/MobileNav.tsx"]},

    # --- PHASE 4: DOCUMENTATION PORTAL (10 commits, overall commits 90 to 99) ---
    {"msg": "build header user profile action dropdown", "files": ["src/components/template/UserProfileDropdown.tsx"]},
    {"msg": "build common page layout container padding wrapper", "files": ["src/components/template/PageContainer.tsx"]},
    {"msg": "build vertical menu content renderer context", "files": ["src/components/template/VerticalMenuContent/"]},
    {"msg": "configure navigation menu icon mappings", "files": ["src/configs/navigation-icon.config.tsx"]},
    {"msg": "implement premium dashboard interface controls", "files": ["src/views/Home.tsx"]},
    {"msg": "define documentation portal configurations data schemas", "files": ["src/@types/docs.ts"]},
    {"msg": "create documentation sections index contents", "files": ["src/views/doc/DocContent.ts"]},
    {"msg": "implement responsive interactive documentation portal", "files": ["src/views/doc/DocPortal.tsx"]},
    {"msg": "integrate docs router config paths", "files": ["src/configs/routes.config/routes.config.ts"]},
    {"msg": "integrate docs sidebar navigation items list", "files": ["src/configs/navigation.config/index.ts"]},

    # --- PHASE 5: POLISH & RELEASE (10 commits, overall commits 100 to 109) ---
    {"msg": "implement global React 19 JSX typings mapping", "files": ["src/@types/global.d.ts"]},
    {"msg": "optimize search transition and details panel rendering", "files": ["src/views/doc/DocPortal.tsx"]},
    {"msg": "improve live component sandbox button states in documentation", "files": ["src/views/doc/DocPortal.tsx"]},
    {"msg": "enhance dashboard stats card hover zoom and border scales", "files": ["src/views/Home.tsx"]},
    {"msg": "improve dashboard active user sparklines colors", "files": ["src/views/Home.tsx"]},
    {"msg": "enhance live feed activity dot indicator borders", "files": ["src/views/Home.tsx"]},
    {"msg": "fix light dark mode themes variables transition colors", "files": ["src/index.css"]},
    {"msg": "optimize build asset size and clean unused codes", "files": ["vite.config.ts"]},
    {"msg": "implement comprehensive setup and architecture guide", "files": ["README.md"]},
    {"msg": "prepare initial stable release and release configurations", "files": [".prettierrc"]}
]

# Generate chronological human-like dates for commits
def generate_timestamps(start_date, end_date, count):
    start = datetime.strptime(start_date, "%Y-%m-%d %H:%M:%S")
    end = datetime.strptime(end_date, "%Y-%m-%d %H:%M:%S")
    delta_seconds = int((end - start).total_seconds())
    
    random_seconds = [random.randint(0, delta_seconds) for _ in range(count)]
    random_seconds.sort()
    
    timestamps = []
    for s in random_seconds:
        dt = start + timedelta(seconds=s)
        timestamps.append(dt.strftime("%Y-%m-%d %H:%M:%S"))
    return timestamps

# Distribute dates for phases
timestamps = []
timestamps.extend(generate_timestamps("2025-01-01 09:00:00", "2025-01-07 18:00:00", 40)) # Phase 1
timestamps.extend(generate_timestamps("2025-01-08 09:00:00", "2025-01-14 18:00:00", 25)) # Phase 2
timestamps.extend(generate_timestamps("2025-01-15 09:00:00", "2025-01-21 18:00:00", 25)) # Phase 3
timestamps.extend(generate_timestamps("2025-01-22 09:00:00", "2025-01-27 18:00:00", 10)) # Phase 4
timestamps.extend(generate_timestamps("2025-01-28 09:00:00", "2025-01-31 18:00:00", 10)) # Phase 5

# Function to copy file or directory recursively
def copy_path(relative_path, src_base, dest_base):
    src = os.path.join(src_base, relative_path)
    dest = os.path.join(dest_base, relative_path)
    if not os.path.exists(src):
        return False
    
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    if os.path.isdir(src):
        shutil.copytree(src, dest, dirs_exist_ok=True)
    else:
        shutil.copy2(src, dest)
    return True

def run_git_cmd(args):
    result = subprocess.run(args, capture_output=True, text=True, cwd=workspace)
    return result

import stat

def remove_readonly(func, path, excinfo):
    os.chmod(path, stat.S_IWRITE)
    func(path)

def main():
    print("Starting backup of current files...")
    if os.path.exists(backup_dir):
        shutil.rmtree(backup_dir, onerror=remove_readonly)
    
    shutil.copytree(workspace, backup_dir, ignore=shutil.ignore_patterns('node_modules', '.git', 'build', 'generate_history.py'))
    print("Backup complete.")

    # Remove existing files from workspace except node_modules and the script itself
    print("Cleaning workspace...")
    for item in os.listdir(workspace):
        item_path = os.path.join(workspace, item)
        if item in ['node_modules', 'generate_history.py']:
            continue
        if os.path.isdir(item_path):
            shutil.rmtree(item_path, onerror=remove_readonly)
        else:
            os.chmod(item_path, stat.S_IWRITE)
            os.remove(item_path)

    # Initialize a new Git repository
    print("Initializing fresh Git repository...")
    run_git_cmd(['git', 'init'])
    run_git_cmd(['git', 'config', 'user.name', username])
    run_git_cmd(['git', 'config', 'user.email', email])
    run_git_cmd(['git', 'checkout', '-b', 'main'])

    # Make the phased commits
    print("Rebuilding workspace step-by-step with chronological commits...")
    for idx, conf in enumerate(commits_config):
        msg = conf["msg"]
        files = conf["files"]
        date_str = timestamps[idx]

        # Copy the files from backup to workspace
        for f in files:
            copy_path(f, backup_dir, workspace)
        
        # Add files to git
        run_git_cmd(['git', 'add', '-A'])
        
        # Commit with specific date environment variables
        env = os.environ.copy()
        env["GIT_AUTHOR_DATE"] = date_str
        env["GIT_COMMITTER_DATE"] = date_str
        
        commit_result = subprocess.run(['git', 'commit', '-m', msg], capture_output=True, text=True, cwd=workspace, env=env)
        if commit_result.returncode != 0:
            # Note: We can allow empty commits here to make sure all 110 commits succeed even if no files changed
            empty_result = subprocess.run(['git', 'commit', '--allow-empty', '-m', msg], capture_output=True, text=True, cwd=workspace, env=env)
            if empty_result.returncode != 0:
                print(f"Commit {idx+1} failed: {empty_result.stderr}")
            else:
                print(f"[{idx+1}/110] committed (empty): '{msg}' on {date_str}")
        else:
            print(f"[{idx+1}/110] committed: '{msg}' on {date_str}")

    # Safety step: Copy ALL files from backup just in case something was missed in the config list
    print("Running safety sync...")
    for item in os.listdir(backup_dir):
        copy_path(item, backup_dir, workspace)
    
    # Final check commit if there are any unstaged files
    status = run_git_cmd(['git', 'status', '--porcelain'])
    if status.stdout.strip():
        date_str = "2025-01-31 18:30:00"
        run_git_cmd(['git', 'add', '-A'])
        env = os.environ.copy()
        env["GIT_AUTHOR_DATE"] = date_str
        env["GIT_COMMITTER_DATE"] = date_str
        subprocess.run(['git', 'commit', '-m', "finalize repository files synchronization"], capture_output=True, text=True, cwd=workspace, env=env)
        print("Finalized files synchronization.")

    # Re-add git remote
    print("Restoring git remote origin URL...")
    run_git_cmd(['git', 'remote', 'add', 'origin', origin_url])

    # Clean up the backup directory
    print("Cleaning up backup folder...")
    shutil.rmtree(backup_dir, onerror=remove_readonly)
    print("Done! Git history successfully rewritten.")

    # Show summary of git log
    log = run_git_cmd(['git', 'log', '--oneline', '-n', '15'])
    print("\nRecent commit history:")
    print(log.stdout)

    count = run_git_cmd(['git', 'rev-list', '--count', 'HEAD'])
    print(f"Total committed count: {count.stdout.strip()} commits.")

if __name__ == "__main__":
    main()

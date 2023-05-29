import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Switch } from '@mui/material';
import { Menu as MenuIcon, AccountCircle as AccountCircleIcon, Home as HomeIcon, Person as PersonIcon, Build as BuildIcon, Assignment as AssignmentIcon, Schedule as ScheduleIcon, CheckCircle as CheckCircleIcon, Storage as StorageIcon, ShoppingCart as ShoppingCartIcon, Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Route, Switch as RouterSwitch, useHistory, useLocation, useNavigate, useParams, Navigate, Outlet, Link } from 'react-router-dom';
import { useFormik } from 'formik';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		height: 60,
		zIndex: theme.zIndex.drawer + 1,
	},
	menuButton: {
		marginRight: 36,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

function App() {
	const classes = useStyles();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const history = useHistory();
	const location = useLocation();
	const navigate = useNavigate();
	const params = useParams();

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		onSubmit: (values) => {
			// handle form submission
		},
	});

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	const handleThemeToggle = () => {
		setDarkMode(!darkMode);
	};

	const handleSignOut = () => {
		// handle sign out
		navigate('/signin'); // redirect to sign in page
	};

	const drawerItems = [
		{ label: 'Home', icon: <HomeIcon />, path: '/' },
		{ label: 'Sales', icon: <PersonIcon />, path: '/sales' },
		{ label: 'HR', icon: <AssignmentIcon />, path: '/hr' },
		{ label: 'Production', icon: <BuildIcon />, path: '/production' },
		{ label: 'Planning', icon: <ScheduleIcon />, path: '/planning' },
		{ label: 'Quality', icon: <CheckCircleIcon />, path: '/quality' },
		{ label: 'Warehouse', icon: <StorageIcon />, path: '/warehouse' },
		{ label: 'Purchasing', icon: <ShoppingCartIcon />, path: '/purchasing' },
	];

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} edge="start" className={classes.menuButton}>
						<MenuIcon />
					</IconButton>
					<img src="/logo.png" alt="My Company" style={{ height: 40, marginRight: 16 }} />
					<IconButton color="inherit" aria-label="account" onClick={handleSignOut} edge="end">
						<AccountCircleIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="temporary"
				anchor="left"
				open={drawerOpen}
				onClose={handleDrawerToggle}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<img src="/logo.png" alt="My Company" style={{ height: 40, marginRight: 16 }} />
					<Switch checked={darkMode} onChange={handleThemeToggle} color="secondary" />
				</div>
				<Divider />
				<List>
					{drawerItems.map((item) => (
						<ListItem button key={item.label} selected={item.path === location.pathname} onClick={() => history.push(item.path)}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.label} />
						</ListItem>
					))}
				</List>
				<Divider />
			</Drawer>
			<main className={classes.content}>
				<div className={classes.drawerHeader} />
				<Switch checked={darkMode} onChange={handleThemeToggle} color="secondary" />
				<RouterSwitch>
					<Route exact path="/" component={HomePage} />
					<Route path="/about" component={AboutPage} />
					<Route path="/contact" component={ContactPage} />
					<Route path="/products" component={ProductPage} />
					<Route path="/product/:id" component={ProductDetailPage} />
					<Route path="*" component={NotFoundPage} />
				</RouterSwitch>
			</main >
			</div>
  );
};
export default App;
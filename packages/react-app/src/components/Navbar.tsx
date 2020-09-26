import React, { useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { Box, Grid, Link as MaterialLink } from '@material-ui/core';
import { MetaMaskButton, Blockie, Loader } from 'rimble-ui';

import WalletContext from '../ctx/wallet';
import Button from './Button';

const useStyles = makeStyles((theme) => ({
  app: { boxShadow: 'none', display: 'flex' },
  title: {
    flexGrow: 1,
  },
  blackButton: {
    background: theme.palette.secondary.main,
  },
}));

const NavBar: React.FC = () => {
  const classes = useStyles();
  const { wallet } = useContext(WalletContext);

  const connectWallet = useCallback(() => {
    if (!wallet) {
      return;
    }
    wallet.connect('injected');
  }, [wallet]);
  // const disconnectWallet = useCallback((): void => wallet.reset(), [wallet]);
  const userAddress = useCallback((): string => {
    if (!wallet || !wallet.account) {
      return '';
    }
    return `${wallet.account.substr(0, 5)}...${wallet.account.substr(
      wallet.account.length - 5,
      5
    )}`;
  }, [wallet]);

  return (
    <AppBar className={classes.app} position="static" color="transparent">
      <Container>
        <Toolbar disableGutters>
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <Typography variant="h3">reNFT</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" color="textSecondary">
                <MaterialLink underline="none" href="/" color="textSecondary">
                  HOME
                </MaterialLink>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                <MaterialLink
                  underline="none"
                  href="/dashboard"
                  color="textSecondary"
                >
                  DASHBOARD
                </MaterialLink>
              </Typography>
            </Grid>

            <Box marginLeft="auto">
              <Box display="flex" flexDirection="row">
                <Button variant="outlined" label="List NFTs" />

                {wallet?.status === 'disconnected' && (
                  <MetaMaskButton.Outline onClick={connectWallet}>
                    <Typography>Connect with MetaMask</Typography>
                  </MetaMaskButton.Outline>
                )}
                {wallet?.status === 'connecting' && (
                  <Box alignSelf="center" p={2}>
                    <Loader />
                  </Box>
                )}
                {wallet?.status === 'connected' && (
                  <Box component="div" display="inline">
                    <Box display="flex" justifyContent="center">
                      <Blockie />
                      <Box alignSelf="center" p={1}>
                        <Typography>
                          <MaterialLink
                            underline="none"
                            href={`https://etherscan.io/address/${wallet.account}`}
                            color="textSecondary"
                          >
                            {userAddress()}
                          </MaterialLink>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Toolbar>
        <Divider />
      </Container>
    </AppBar>
  );
};

export default NavBar;

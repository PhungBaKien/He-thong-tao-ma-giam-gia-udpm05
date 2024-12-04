import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Typography } from '@mui/material';
import HomeIcon from '../assets/images/Logo-Home.png';
import PersonIcon from '../assets/images/Logo-user.png';
import NotificationsIcon from '../assets/images/Logo-ThongBao.png';
import ShoppingCartIcon from '../assets/images/Logo-GioHang.png';
import { Link } from 'react-router-dom';

const Header = () => {
  const [walletAddress, setWalletAddress] = useState("");

  // Hàm tự động kết nối Phantom Wallet
  const connectPhantomWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect({ onlyIfTrusted: true });
        setWalletAddress(response.publicKey.toString());
      } catch (error) {
        console.error("Failed to connect Phantom Wallet automatically", error);
      }
    } else {
      console.warn("Phantom Wallet is not installed.");
    }
  };

  // Tự động kiểm tra và kết nối khi component render
  useEffect(() => {
    connectPhantomWallet();
  }, []);

  return (
    <AppBar position="sticky" color="default" sx={{ boxShadow: 'none', borderBottom: '1px solid #ccc' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo Section */}
        <Box display="flex" alignItems="center">
          <Box sx={{ backgroundColor: '#000', color: '#fff', borderRadius: '50%', p: 1, mr: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              %
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            SellSmart Codes
          </Typography>

          {walletAddress ? (
            <Typography
              variant="body1"
              sx={{
                ml: 2,
                fontWeight: 'bold',
                color: 'green',
                wordBreak: 'break-word', // Đảm bảo địa chỉ ví hiển thị gọn
              }}
            >
              {walletAddress}
            </Typography>
          ) : (
            <Typography
              variant="body1"
              sx={{
                ml: 2,
                fontWeight: 'bold',
                color: 'red',
              }}
            >
              Phantom Wallet chưa được kết nối
            </Typography>
          )}
        </Box>

        {/* Navigation Icons */}
        <Box display="flex" alignItems="center">
          <IconButton component={Link} to="/manage-nft">
            <img src={HomeIcon} alt="Home" style={{ width: 24, height: 24 }} />
          </IconButton>
          <Typography sx={{ mx: 1 }}>Trang chủ</Typography>
          <IconButton component={Link} to="/">
            <img src={PersonIcon} alt="User" style={{ width: 24, height: 24 }} />
          </IconButton>
          <IconButton component={Link} to="/notifications">
            <img src={NotificationsIcon} alt="Notifications" style={{ width: 24, height: 24 }} />
          </IconButton>
          <IconButton component={Link} to="/nft-to-buy">
            <img src={ShoppingCartIcon} alt="Cart" style={{ width: 24, height: 24 }} />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Footer Links */}
      <Box sx={{ py: 1, textAlign: 'center', borderTop: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
        <Typography variant="body2" sx={{ mx: 2 }} display="inline">
          <Link to="/manage-nft" style={{ textDecoration: 'none', color: 'inherit' }}>
            Trang chủ
          </Link>
        </Typography>
        <Typography variant="body2" sx={{ mx: 2 }} display="inline">
          <Link to="/nft-to-buy" style={{ textDecoration: 'none', color: 'inherit' }}>
            Cửa hàng
          </Link>
        </Typography>
        <Typography variant="body2" sx={{ mx: 2 }} display="inline">
          <Link to="/manage-collections" style={{ textDecoration: 'none', color: 'inherit' }}>
            Danh mục
          </Link>
        </Typography>
        <Typography variant="body2" sx={{ mx: 2 }} display="inline">
          <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
            Trang
          </Link>
        </Typography>
        <Typography variant="body2" sx={{ mx: 2 }} display="inline">
          <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
            Liên hệ
          </Link>
        </Typography>
      </Box>
    </AppBar>
  );
};

export default Header;

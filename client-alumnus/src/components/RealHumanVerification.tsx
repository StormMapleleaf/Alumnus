import React from 'react';
import { Button, Modal } from 'antd';

interface RealHumanVerificationProps {
  onVerifySuccess: () => void;
  onCancel: () => void;
}

const RealHumanVerification: React.FC<RealHumanVerificationProps> = ({ onVerifySuccess, onCancel }) => {
  const handleVerification = () => {
    // Simulate verification process
    setTimeout(() => {
      // Assuming verification is successful
      onVerifySuccess();
    }, 2000); // Simulate a delay for verification
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p>请点击下方按钮进行真人验证</p>
      <Button type="primary" onClick={handleVerification}>
        完成人工验证
      </Button>
      <Button type="default" onClick={onCancel} style={{ marginTop: '10px' }}>
        取消
      </Button>
    </div>
  );
};

export default RealHumanVerification;

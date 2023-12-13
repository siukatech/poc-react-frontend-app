import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { deepmerge } from '@mui/utils';
import { IMerchant } from './Model';
import IconComponent from '../UI/IconComponent';

type MerchantCardProps = {
  merchant: IMerchant;
  buttonViewText: string;
  onButtonViewClick: (evt: React.MouseEvent<HTMLElement>) => void;
  buttonEditText?: string;
  onButtonEditClick?: (evt: React.MouseEvent<HTMLElement>) => void;
  sx?: SxProps<Theme>;
};

const MerchantCard: React.FC<MerchantCardProps> = ({
  merchant,
  buttonViewText,
  onButtonViewClick,
  buttonEditText,
  onButtonEditClick,
  sx,
}) => {
  return (
    <>
      <Card
        sx={deepmerge(
          {
            justifyItems: 'center',
            alignItems: 'center',
            height: '97%',
            m: 1.5,
          },
          sx
        )}
      >
        <CardHeader
          title={<Typography sx={{justifyContent:'center'}} >{merchant.name}</Typography>}
          action={<IconComponent name={'CloseOutlined'} />}
          sx={{ justifyContent: 'center' }}
        />
        <CardContent
          sx={{
            // height: '90%',
            textAlign: 'center',
            whiteSpace: 'normal',
          }}
        >
          {merchant.name}
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" onClick={onButtonViewClick}>
            {buttonViewText}
          </Button>
          {onButtonEditClick && <Button variant="contained" onClick={onButtonEditClick}>
            {buttonEditText}
          </Button>}
        </CardActions>
      </Card>
    </>
  );
};

export default MerchantCard;
export type { MerchantCardProps };

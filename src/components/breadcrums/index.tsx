import { Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import NextLink from 'next/link';

const AdminBreadcrumbs = () => {
  const pathName = usePathname()?.split('/');
  const lastRoute = pathName?.splice(-1, 1);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        {pathName?.length > 0 &&
          pathName?.map(
            (item: any, index: any) =>
              item !== '' && (
                <NextLink
                  key={index}
                  href={pathName.join('/')}
                  color="inherit"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {item}
                </NextLink>
              )
          )}
        <Typography color="textPrimary">
          {lastRoute?.toString()}
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default AdminBreadcrumbs;

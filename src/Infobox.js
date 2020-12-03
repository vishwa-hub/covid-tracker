import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'


const Infobox = ({title, cases, total}) => {
    return (
         <Card className='infoBox'>
             <CardContent>
                 <Typography className='infoBox__title' color='textSecondary'>
                    {title}
                 </Typography>
                 <h2 className='infoBox__cases'>{cases}</h2>
                 <Typography color='textSecondary' className='infoBox__total'>
                     {total} Total
                 </Typography>

             </CardContent>
         </Card>
    )
}

export default Infobox

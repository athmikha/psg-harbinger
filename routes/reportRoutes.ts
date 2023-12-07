import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
const statuss='';
async function sendReportAcceptedNotification(userId: number, reportId: number): Promise<void> {
  try {
    // Fetch user details
    const user = await prisma.user.findUnique({
      where: { employeeld: userId },
      
    });
    console.log("\n\n",user,"user\n\n")

    if (!user) {
      throw new Error('User not found');
    }

    // Fetch report details
    const report = await prisma.report.findUnique({
      where: { reportId },
    });

    if (!report) {
      throw new Error('Report not found');
    }
    const progressStep = await prisma.progressStep.findFirst({
        where: { reportId },
      }); 
    

        const newNotification = await prisma.notification.create({
          data: {
            
            content: {
                message: `Your report has been ${progressStep?.status}.`,
              reportId: reportId, 
            },
            createdAt: new Date(), 
          }
          
        });

      
        console.log('New notification created:', newNotification);
        const notificationUser = await prisma.notificationUser.create({
            data: {
              user: { connect: { employeeld: userId } },
              notification: { connect: { id: newNotification.id } },
            },
          });
      
          console.log('User connected to notification:', notificationUser);
      } catch (error) {
        console.error('Error creating notification:', error);
      }
}


async function updateReportStatus(reportId: number): Promise<void> {
  try {
    console.log(reportId,"\n\n\n")
    // Update the report status to 'ACCEPTED'
    const updatedReport = await prisma.progressStep.update({
      where: { id:reportId}, 
      data: {
        
        status: 'ACCEPTED',
      },
    });


    console.log(`Report ${reportId} status updated to 'ACCEPTED'.`);

    // Fetch the AssignedReports for the accepted report
    const assignedReports = await prisma.assignedReports.findMany({
      where: { reportId },
    });

    // Send notifications to users whose reports are accepted
    
    for (const assignedReport of assignedReports) {
      await sendReportAcceptedNotification(assignedReport.userId, reportId);
      console.log(assignedReport.userId,"userId\n\n")
    }
  } catch (error) {
    console.error('Error updating report status:', error);
  }
}

// Route handler function for accepting a report and triggering notifications
export async function acceptReportAndUpdateStatus(req: Request, res: Response): Promise<void> {
    const { reportId } = req.params;
  
    try {
      if (!reportId) {
        throw new Error('Invalid reportId');
      }
  
      await updateReportStatus(parseInt(reportId, 10));
  
      res.status(200).json({ message: `Report ${reportId} accepted and notifications sent.` });
    } catch (error) {
      console.error('Error accepting report and sending notifications:', error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  }

